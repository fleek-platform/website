import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { decodeAccessToken } from '@fleek-platform/utils-token';
import settings from '@base/settings.json';
import { clearCookie, setCookie, getCookie } from '@utils/cookies';
import { useRef } from 'react';
import type { Project } from '@fleekxyz/sdk/dist-types/generated/graphqlClient/schema';

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
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProjects, setUserProjects] = useState<Project[]>([]);
  const [userActiveProject, setUserActiveProject] = useState<
    string | undefined
  >();

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

  const fetchGraphQLUserProjects = async (): Promise<void> => {
    if (!isLoggedIn()) return;
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
        authorization: `Bearer ${getCookie(settings.site.auth.authTokenName)}`,
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

      const projects = data.projects.data as Project[];
      setUserProjects(projects);

      const activeProject = getActiveProjectId();

      if (
        !activeProject ||
        !projects.find((project) => project.id === activeProject)
      ) {
        setActiveProject(projects.length ? projects[0].id : undefined);
      }
    } catch (error) {
      console.error('Failed to fetch user projects:', error);
    }
  };

  const login = (): Promise<boolean> => {
    if (isLoggedIn()) return Promise.resolve(true);

    setIsAuthenticating(true);
    setShowAuthFlow(true);

    return new Promise<boolean>((resolve, reject) => {
      loginPromiseRef.current = { resolve, reject };
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserActiveProject(undefined);
    setUserProjects([]);
    clearCookie(settings.site.auth.authTokenName);
    clearCookie(settings.site.auth.activeProjectTokenName);
    handleLogOut();
  };

  const setActiveProject = (project: string | Project | undefined) => {
    if (typeof project === 'string') {
      setCookie(settings.site.auth.activeProjectTokenName, project, 30);
      setUserActiveProject(project);
    } else if (project) {
      setCookie(settings.site.auth.activeProjectTokenName, project.id, 30);
      setUserActiveProject(project.id);
    }
  };

  const getActiveProjectId = (): string | undefined => {
    if (!isLoggedIn()) return undefined;

    return (
      userActiveProject ?? getCookie(settings.site.auth.activeProjectTokenName)
    );
  };

  const isLoggedIn = useCallback((): boolean => {
    return (
      !!isAuthenticated &&
      !!user &&
      !!getCookie(settings.site.auth.authTokenName)
    );
  }, [isAuthenticated, user, getCookie]);

  useEffect(() => {
    const initializeProjects = async () => {
      setIsLoadingProjects(true);
      try {
        await fetchGraphQLUserProjects();
      } catch (error) {
        console.error('Failed to initialize user projects:', error);
      } finally {
        setIsLoadingProjects(false);
      }
    };

    if (isLoggedIn() && !userProjects.length && !isLoadingProjects) {
      initializeProjects();
    }
  }, [isLoggedIn, fetchGraphQLUserProjects, user]);

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
        await fetchGraphQLUserProjects();
        setIsAuthenticated(true);
        if (loginPromiseRef.current) {
          loginPromiseRef.current.resolve(true);
          loginPromiseRef.current = null;
        }
      } else if (isAuthTokenValid && !isGraphQLTokenValid) {
        const success = await fetchGraphQLToken();
        if (loginPromiseRef.current) {
          if (success) {
            await fetchGraphQLUserProjects();
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

  return {
    isLoggedIn,
    isAuthenticating,
    login,
    logout,
    user,
    userProjects,
    setActiveProject,
    getActiveProjectId,
    loadProjects: fetchGraphQLUserProjects,
  };
};
