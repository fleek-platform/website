import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Project } from '@fleekxyz/sdk/dist-types/generated/graphqlClient/schema';
import settings from '@base/settings.json';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';
import { useAuthentication } from '@components/AuthProvider/useAuthentication';

const GRAPHQL_URL = import.meta.env?.PUBLIC_GRAPHQL_ENDPOINT || '';

export const useProjects = () => {
  const { fetchFleekToken, isLoggedIn } = useAuthentication();
  const [userProjects, setUserProjects] = useState<Project[] | undefined>();
  const [cookies, setCookie] = useCookies([
    settings.site.auth.activeProjectCookieKey,
  ]);
  const activeProjectId = cookies[settings.site.auth.activeProjectCookieKey];
  const [loading, setLoading] = useState(false);

  const fetchGraphQLUserProjects = useCallback(
    async (token?: string): Promise<Project[] | undefined> => {
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
        const response = await fetch(GRAPHQL_URL, options);
        const { data } = await response.json();

        const projects = (data?.projects?.data || []) as Project[];
        return projects;
      } catch (error) {
        console.error('Failed to fetch user projects:', error);
      }
    },
    [],
  );

  const setActiveProject = useCallback(
    async (projectId?: string) => {
      if (!projectId) return;
      setCookie(settings.site.auth.activeProjectCookieKey, projectId, {});
      if (!userProjects) return;
      const activeProject = userProjects.find(({ id }) => id === projectId);
      if (activeProject) {
        toast.success(`Switched project to: ${activeProject?.name}`);
      }
    },
    [setCookie, userProjects],
  );

  const fetchProjects = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const token = await fetchFleekToken();
      if (!token) return;
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
    } finally {
      setLoading(false);
    }
  }, [
    activeProjectId,
    fetchFleekToken,
    fetchGraphQLUserProjects,
    setActiveProject,
    loading,
  ]);

  useEffect(() => {
    if (!userProjects || !activeProjectId) {
      fetchProjects();
    }
  }, [fetchProjects, userProjects, activeProjectId, isLoggedIn]);

  return {
    userProjects,
    activeProjectId,
    setActiveProject,
    loading,
    fetchProjects,
  };
};
