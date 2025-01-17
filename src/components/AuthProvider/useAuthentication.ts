import { useState, useEffect, useCallback, useMemo, useContext } from 'react';
import {
  useDynamicContext,
  useIsLoggedIn,
  getAuthToken,
} from '@dynamic-labs/sdk-react-core';
import { useCookies } from 'react-cookie';

import { decodeAccessToken } from '@fleek-platform/utils-token';

import settings from '@base/settings.json';
import { AuthContext } from './AuthProvider';

const GRAPHQL_URL = import.meta.env?.PUBLIC_GRAPHQL_ENDPOINT || '';

export const useAuthentication = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  const { setShowAuthFlow, handleLogOut } = useDynamicContext();
  const isDynamicLoggedIn = useIsLoggedIn();
  const [cookies, setCookie, removeCookie] = useCookies([
    settings.site.auth.authTokenCookieKey,
  ]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  const fetchFleekToken = useCallback(
    async (projectId?: string): Promise<string | undefined> => {
      const authToken = getAuthToken();

      if (!authToken) return;
      const tokenFromCookies = cookies[settings.site.auth.authTokenCookieKey];

      if (tokenFromCookies) {
        const decodedToken = decodeAccessToken({ token: tokenFromCookies });
        if (
          decodedToken &&
          decodedToken.projectId === projectId &&
          decodedToken.exp > Date.now() / 1000
        ) {
          return tokenFromCookies;
        } else {
          removeCookie(settings.site.auth.authTokenCookieKey);
        }
      }

      const query = `
        mutation LoginWithDynamic($data: LoginWithDynamicDataInput!) {
          loginWithDynamic(data: $data)
        }
      `;

      const variables = {
        data: {
          authToken,
          projectId,
        },
      };

      if (projectId) {
        variables.data.projectId = projectId;
      }

      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          query,
          variables,
        }),
      };

      try {
        const response = await fetch(GRAPHQL_URL, options);

        const { data } = await response.json();
        const decodedToken = decodeAccessToken({
          token: data?.loginWithDynamic,
        });

        setCookie(
          settings.site.auth.authTokenCookieKey,
          data?.loginWithDynamic,
          {
            expires: new Date(decodedToken.exp * 1000),
          },
        );
        return data?.loginWithDynamic;
      } catch (error) {
        console.error('Failed to fetch Fleek token:', error);
        return;
      }
    },
    [cookies[settings.site.auth.activeProjectCookieKey]],
  );

  const login = useCallback(async () => {
    context.setAuthState('logging-in');
    setIsLoggingIn(true);
    setShowAuthFlow(true);
  }, [setShowAuthFlow]);

  const logout = useCallback(() => {
    removeCookie(settings.site.auth.authTokenCookieKey);
    removeCookie(settings.site.auth.activeProjectCookieKey);
    context.setAuthState('logged-out');
    handleLogOut();
    setIsLoggedIn(false);
  }, [removeCookie, context.setAuthState, handleLogOut]);

  useEffect(() => {
    const initAuth = async () => {
      if (!isDynamicLoggedIn) {
        context.setAuthState('logged-out');
        setIsLoggedIn(false);
        setIsLoggingIn(false);
        return;
      } else {
        context.setAuthState('logging-in');
        setIsLoggingIn(true);
        context.setAuthState('logged-in');
        setIsLoggedIn(true);
        setIsLoggingIn(false);
      }
    };

    initAuth();
  }, [isDynamicLoggedIn, context.setAuthState]);

  useEffect(() => {
    if (context.authState === 'logged-out') {
      setIsLoggingIn(false);
    }
  }, [context.authState]);

  return {
    isLoggedIn,
    isLoggingIn,
    login,
    logout,
    fetchFleekToken,
  };
};
