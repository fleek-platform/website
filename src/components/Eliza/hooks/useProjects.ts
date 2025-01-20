import { useState, useMemo } from 'react';
import type { Project } from '@fleekxyz/sdk/dist-types/generated/graphqlClient/schema';

import settings from '@base/settings.json';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';
import { useAuthStore } from '@fleek-platform/login-button';

export const useProjects = () => {
  const { accessToken, loading } = useAuthStore();

  const [userProjects, setUserProjects] = useState<Project[] | undefined>();
  const [cookies, setCookie, removeCookie] = useCookies([
    settings.site.auth.activeProjectCookieKey,
    settings.site.auth.authTokenCookieKey,
  ]);
  const activeProjectId = useMemo(
    () => cookies[settings.site.auth.activeProjectCookieKey],
    [cookies[settings.site.auth.activeProjectCookieKey]],
  );
  const isLoggedIn = !!accessToken;
  const isLoggingIn = loading;

  const fetchGraphQLUserProjects = async (
    accessToken?: string,
  ): Promise<Project[] | undefined> => {
    if (!accessToken) return;

    const query = `query projects($filter: ProjectsPaginationInput) {
      projects(filter: $filter) {
        data {
          id
          name
          avatar
        }
      }
    }`;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        operationName: 'projects',
        query,
        variables: {},
      }),
    };

    try {
      const response = await fetch(import.meta.env.PUBLIC_GRAPHQL_ENDPOINT, options);
      const { data } = await response.json();

      const projects = (data?.projects?.data || []) as Project[];
      return projects;
    } catch (error) {
      console.error('Failed to fetch user projects:', error);
    }
  };

  // const login = useCallback(async () => {
  //   context.setAuthState('logging-in');
  //   setShowAuthFlow(true);
  // }, [setShowAuthFlow]);
  const login = () => null;

  const logout = () => {
    setUserProjects(undefined);
    setActiveProject(undefined);
    removeCookie(settings.site.auth.authTokenCookieKey);
    removeCookie(settings.site.auth.activeProjectCookieKey);
    // context.setAuthState('logged-out');
    // handleLogOut();
  };

  const setActiveProject = async (projectId?: string) => {
    if (!projectId) return;
    setCookie(settings.site.auth.activeProjectCookieKey, projectId, {});
    if (!userProjects) return;
    const activeProject = userProjects.find(({ id }) => id === projectId);
    if (activeProject) {
      toast.success(`Switched project to: ${activeProject?.name}`);
    }
  };

  const initializeProjects = async () => {
    try {
      const projects = !!userProjects
        ? userProjects
        : await fetchGraphQLUserProjects(accessToken);
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

  return {
    isLoggedIn,
    isLoggingIn,

    login,
    logout,

    userProjects,
    setActiveProject,
    activeProjectId,
    loadProjects: fetchGraphQLUserProjects,
  };
};
