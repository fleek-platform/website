import { useState, useEffect } from 'react';
import type { Project } from '@fleekxyz/sdk/dist-types/generated/graphqlClient/schema';
import toast from 'react-hot-toast';
import { useAuthStore } from '@fleek-platform/login-button';

const GRAPHQL_URL = import.meta.env?.PUBLIC_GRAPHQL_ENDPOINT || '';

export const useProjects = () => {
  const [userProjects, setUserProjects] = useState<Project[] | undefined>();
  const [loading, setLoading] = useState(false);
  const {
    accessToken,
    projectId: activeProjectId,
    setProjectId,
  } = useAuthStore();

  // TODO: Move to the eliza/api file
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

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        operationName: 'projects',
        query,
        variables: {},
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
  };

  const setActiveProject = async (projectId?: string) => {
    if (!projectId || !userProjects) return;

    const activeProject = userProjects.find(({ id }) => id === projectId);
    if (activeProject) {
      toast.success(`Switched project to: ${activeProject?.name}`);
    }

    setProjectId(projectId);
  };

  const fetchProjects = async () => {
    if (loading || !accessToken) return;

    setLoading(true);

    try {
      const projects = await fetchGraphQLUserProjects(accessToken);

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
  };

  useEffect(() => {
    if (!userProjects || !activeProjectId) {
      fetchProjects();
    }
  }, [fetchProjects, userProjects, activeProjectId]);

  return {
    userProjects,
    activeProjectId,
    setActiveProject,
    loading,
    fetchProjects,
  };
};
