import { useEffect, useCallback } from 'react';
import type { Project } from '@fleekxyz/sdk/dist-types/generated/graphqlClient/schema';
import settings from '@base/settings.json';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';
import { useAuthentication } from '@components/AuthProvider/useAuthentication';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '@utils/queryClient';

const GRAPHQL_URL = import.meta.env?.PUBLIC_GRAPHQL_ENDPOINT || '';

export const useProjects = () => {
  const { fetchFleekToken, isLoggedIn } = useAuthentication();
  const [cookies, setCookie] = useCookies([
    settings.site.auth.activeProjectCookieKey,
  ]);
  const activeProjectId = cookies[settings.site.auth.activeProjectCookieKey];

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

  const { data: userProjects, isLoading } = useQuery(
    {
      queryKey: ['projects'],
      queryFn: async () => {
        const token = await fetchFleekToken();
        if (!token) return undefined;
        return fetchGraphQLUserProjects(token);
      },
      enabled: !!isLoggedIn,
    },
    queryClient,
  );

  const setActiveProject = useCallback(
    (projectId?: string) => {
      if (!projectId) return;
      setCookie(settings.site.auth.activeProjectCookieKey, projectId, {});
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success(`Switched project to: ${projectId}`);
    },
    [setCookie, queryClient],
  );

  useEffect(() => {
    if (userProjects && activeProjectId) {
      const activeProject = userProjects.find(
        ({ id }) => id === activeProjectId,
      );
      if (activeProject) {
        toast.success(`Switched project to: ${activeProject?.name}`);
      }
    }
  }, [userProjects, activeProjectId]);

  return {
    userProjects,
    activeProjectId,
    setActiveProject,
    loading: isLoading,
  };
};
