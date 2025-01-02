import { useState, useEffect, useCallback, useRef } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { decodeAccessToken } from '@fleek-platform/utils-token';
import type { Project } from '@fleekxyz/sdk/dist-types/generated/graphqlClient/schema';

import settings from '@base/settings.json';
import { clearCookie, setCookie, getCookie } from '@utils/cookies';
import { AUTH_TOKEN_NAME } from '@components/Eliza/utils/contants';
import { getProject, getSubscription, getTeam } from './api/api';

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
  const [activeSubscriptions, setActiveSubscriptions] = useState<
    any[] | undefined
  >([]);

  const loginPromiseRef = useRef<{
    resolve: (value: boolean) => void;
    reject: (reason?: any) => void;
  } | null>(null);

  const fetchGraphQLToken = async (
    projectId?: string,
  ): Promise<string | undefined> => {
    setIsAuthenticating(true);

    const query = `mutation loginWithDynamic($data: LoginWithDynamicDataInput!) {
      loginWithDynamic(data: $data)
    }`;

    const variables = {
      data: { authToken, projectId },
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
      setIsAuthenticating(false);
      return newToken;
    } catch (error) {
      console.error('Failed to fetch GraphQL token:', error);
      setIsAuthenticated(false);
      return;
    }
  };

  const fetchGraphQLUserProjects = async (): Promise<Project[] | undefined> => {
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
      return projects;
    } catch (error) {
      console.error('Failed to fetch user projects:', error);
    }
  };

  const loadSubscriptions = async (projectId: string) => {
    setActiveSubscriptions(undefined);
    const token = getCookie(AUTH_TOKEN_NAME);
    console.log('🚀 ~ loadSubscriptions ~ token:', token);
    if (!token) return false;

    const projectResponse = await getProject(projectId, token);
    console.log('🚀 ~ loadSubscriptions ~ projectResponse:', projectResponse);
    if (!projectResponse.ok || !projectResponse?.data?.teamId) return false;

    const teamResponse = await getTeam(projectResponse.data.teamId, token);
    console.log('🚀 ~ loadSubscriptions ~ teamResponse:', teamResponse);
    if (!teamResponse.ok || !teamResponse?.data?.subscriptionId) return false;

    const subscriptionResponse = await getSubscription(
      teamResponse.data.subscriptionId,
      token,
    );
    console.log(
      '🚀 ~ loadSubscriptions ~ subscriptionResponse:',
      subscriptionResponse,
    );
    if (!subscriptionResponse.ok || !subscriptionResponse?.data?.items)
      return false;

    setActiveSubscriptions(subscriptionResponse.data.items);
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

  const setActiveProject = async (projectId?: string) => {
    if (!projectId) return;
    setCookie(settings.site.auth.activeProjectTokenName, projectId, 30);
    setUserActiveProject(projectId);
    loadSubscriptions(projectId);
  };

  const initializeProjects = async () => {
    if (isLoadingProjects) return;
    const token = getCookie(settings.site.auth.authTokenName);
    if (!token) {
      await updateTokenFromProjectId();
    }
    setIsLoadingProjects(true);

    try {
      const projects = await fetchGraphQLUserProjects();
      if (projects) {
        setUserProjects(projects);

        const activeProjectIdFromCookies = getCookie(
          settings.site.auth.activeProjectTokenName,
        );
        const activeProjectFromCookies = projects.find(
          (project) => project.id === activeProjectIdFromCookies,
        );

        if (!activeProjectFromCookies) {
          setActiveProject(projects.length ? projects[0].id : undefined);
          updateTokenFromProjectId(projects[0].id);
        } else if (activeProjectIdFromCookies !== userActiveProject) {
          setActiveProject(activeProjectIdFromCookies);
          updateTokenFromProjectId(activeProjectIdFromCookies);
        }
      }
    } catch (error) {
      console.error('Failed to initialize user projects:', error);
    } finally {
      setIsLoadingProjects(false);
    }
  };

  const isLoggedIn = useCallback((): boolean => {
    return !!user && !!getCookie(settings.site.auth.authTokenName);
  }, [user, getCookie]);

  const updateTokenFromProjectId = async (projectId?: string) => {
    const token = await fetchGraphQLToken(projectId);
    if (token) {
      const parsedToken = decodeAccessToken({ token });
      setCookie(settings.site.auth.authTokenName, token, parsedToken.exp);

      if (loginPromiseRef.current) {
        loginPromiseRef?.current?.resolve(true);
        loginPromiseRef.current = null;
      }
    }
  };

  const getActiveSubscriptions = useCallback((): any[] | undefined => {
    return activeSubscriptions;
  }, [activeSubscriptions]);

  useEffect(() => {
    if (user) {
      initializeProjects();
    }
  }, [user]);

  return {
    isLoggedIn,
    isAuthenticating,

    login,
    logout,

    user,

    userProjects,
    setActiveProject,
    userActiveProject,
    loadProjects: fetchGraphQLUserProjects,

    getActiveSubscriptions,
  };
};
