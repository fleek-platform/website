import { useState, useEffect } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { decodeAccessToken } from '@fleek-platform/utils-token';
import settings from '@base/settings.json';
import { clearCookie, setCookie, getCookie } from '@utils/cookies';
import { useRef } from 'react';

const isTokenValid = (token: string): boolean => {
  try {
    const decoded = decodeAccessToken({ token });
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp > currentTime;
  } catch (error) {
    return false;
  }
};

export const useAuthentication = () => {
  const { user, setShowAuthFlow, authToken, handleLogOut } =
    useDynamicContext();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loginPromiseRef = useRef<{
    resolve: (value: boolean) => void;
    reject: (reason?: any) => void;
  } | null>(null);

  const fetchGraphQLToken = async (): Promise<boolean> => {
    setIsAuthenticating(true);

    const query = `mutation loginWithDynamic($data: LoginWithDynamicDataInput!) {
      loginWithDynamic(data: $data)
    }`;

    const variables = {
      data: { authToken },
    };

    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        operationName: 'loginWithDynamic',
        query,
        variables,
      }),
    };

    try {
      const response = await fetch(settings.site.graphql.url, options);
      const { data } = await response.json();

      const newToken = data.loginWithDynamic;
      const parsedToken = decodeAccessToken({ token: newToken });
      setCookie(settings.site.auth.authTokenName, newToken, parsedToken.exp);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Failed to fetch GraphQL token:', error);
      setIsAuthenticated(false);
      return false;
    } finally {
      setIsAuthenticating(false);
    }
  };

  useEffect(() => {
    const handleAuthTokenChange = async () => {
      if (!authToken) {
        setIsAuthenticated(false);
        return;
      }

      const graphQLToken = getCookie(settings.site.auth.authTokenName);
      const isAuthTokenValid = isTokenValid(authToken);
      const isGraphQLTokenValid = graphQLToken && isTokenValid(graphQLToken);

      if (isAuthTokenValid && isGraphQLTokenValid) {
        setIsAuthenticated(true);
        if (loginPromiseRef.current) {
          loginPromiseRef.current.resolve(true);
          loginPromiseRef.current = null;
        }
      } else if (isAuthTokenValid && !isGraphQLTokenValid) {
        const success = await fetchGraphQLToken();
        if (loginPromiseRef.current) {
          if (success) {
            loginPromiseRef.current.resolve(true);
          } else {
            loginPromiseRef.current.reject(
              new Error('Failed to fetch GraphQL token'),
            );
          }
          loginPromiseRef.current = null;
        }
      } else {
        setIsAuthenticated(false);
        if (loginPromiseRef.current) {
          loginPromiseRef.current.reject(new Error('Invalid authToken'));
          loginPromiseRef.current = null;
        }
      }
    };

    handleAuthTokenChange();
  }, [authToken]);

  const triggerUserLogin = (): Promise<boolean> => {
    if (isAuthenticated) {
      console.log('Already authenticated');
      return Promise.resolve(true);
    }

    setIsAuthenticating(true);
    setShowAuthFlow(true);
    console.log('Authentication flow started');

    return new Promise<boolean>((resolve, reject) => {
      loginPromiseRef.current = { resolve, reject };
    });
  };

  const logout = () => {
    handleLogOut();
    clearCookie(settings.site.auth.authTokenName);
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    isAuthenticating,
    triggerUserLogin,
    logout,
  };
};
