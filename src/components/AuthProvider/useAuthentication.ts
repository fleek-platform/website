import { useState, useEffect, useCallback, useMemo, useContext } from 'react';
import { useDynamicContext, useIsLoggedIn } from '@dynamic-labs/sdk-react-core';
import type { Project } from '@fleekxyz/sdk/dist-types/generated/graphqlClient/schema';

import settings from '@base/settings.json';
import { useCookies } from 'react-cookie';
import { AuthContext } from './AuthProvider';

export const useAuthentication = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }

  const { setShowAuthFlow, authToken, handleLogOut } = useDynamicContext();
  const isDynamicLoggedIn = useIsLoggedIn();
  const [userProjects, setUserProjects] = useState<Project[] | undefined>();
  const [cookies, setCookie, removeCookie] = useCookies([
    settings.site.auth.activeProjectCookieKey,
    settings.site.auth.authTokenCookieKey,
  ]);
  const activeProjectId = useMemo(
    () => cookies[settings.site.auth.activeProjectCookieKey],
    [cookies[settings.site.auth.activeProjectCookieKey]],
  );
  const isLoggedIn = useMemo(
    () => isDynamicLoggedIn && context.authState === 'logged-in',
    [isDynamicLoggedIn, context.authState],
  );
  const isLoggingIn = useMemo(
    () => context.authState === 'logging-in',
    [context.authState],
  );

  const fetchFleekToken = async (
    projectId?: string,
  ): Promise<string | undefined> => {
    if (!authToken) return;

    const query = `mutation loginWithDynamic($data: LoginWithDynamicDataInput!) {
      loginWithDynamic(data: $data)
    }`;

    const variables: { data: { authToken?: string; projectId?: string } } = {
      data: { authToken },
    };
    if (projectId) {
      variables.data['projectId'] = projectId;
    }

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

      const newToken = data?.loginWithDynamic;
      if (!newToken) return;
      return newToken;
    } catch (error) {
      console.error('Failed to fetch GraphQL token:', error);
      return;
    }
  };

  const fetchGraphQLUserProjects = async (
    token?: string,
  ): Promise<Project[] | undefined> => {
    if (!token) return;

    const query = `query projects($filter: ProjectsPaginationInput) {
      projects(filter: $filter) {
        data {
          id
          name
          avatar
        }
      }
    }`;

    const variables = {};

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        operationName: 'projects',
        query,
        variables,
      }),
    };

    try {
      const response = await fetch(settings.site.graphql.url, options);
      const { data } = await response.json();

      const projects = (data?.projects?.data || []) as Project[];
      return projects;
    } catch (error) {
      console.error('Failed to fetch user projects:', error);
    }
  };

  const login = useCallback(async () => {
    context.setAuthState('logging-in');
    setShowAuthFlow(true);
  }, [setShowAuthFlow]);

  const logout = () => {
    setUserProjects(undefined);
    setActiveProject(undefined);
    removeCookie(settings.site.auth.authTokenCookieKey);
    removeCookie(settings.site.auth.activeProjectCookieKey);
    context.setAuthState('logged-out');
    handleLogOut();
  };

  const setActiveProject = async (projectId?: string) => {
    if (!projectId) return;
    setCookie(settings.site.auth.activeProjectCookieKey, projectId, {});
  };

  const initializeProjects = async () => {
    try {
      const token = await fetchFleekToken();
      const projects = await fetchGraphQLUserProjects(token);
      if (projects && projects.length) {
        setUserProjects(projects);
        const activeProject = projects.find(({ id }) => id === activeProjectId);

        if (!activeProject) {
          setActiveProject(projects.length ? projects[0].id : undefined);
        }
      }
    } catch (error) {
      console.error('Failed to initialize user projects:', error);
      return false;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      console.log('🚀 ~ initAuth ~ isDynamicLoggedIn:', isDynamicLoggedIn);
      if (!isDynamicLoggedIn) {
        context.setAuthState('logged-out');
        return;
      } else {
        context.setAuthState('logging-in');

        if (!userProjects) {
          await initializeProjects();
        }

        context.setAuthState('logged-in');
      }
    };

    initAuth();
  }, [isDynamicLoggedIn, userProjects, context.authState]);

  return {
    isLoggedIn,
    isLoggingIn,

    login,
    logout,

    userProjects,
    setActiveProject,
    activeProjectId,
    loadProjects: fetchGraphQLUserProjects,

    fetchFleekToken,
  };
};
