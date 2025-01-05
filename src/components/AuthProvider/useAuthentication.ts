import { useState, useEffect, useCallback, useRef } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { decodeAccessToken } from '@fleek-platform/utils-token';
import type { Project } from '@fleekxyz/sdk/dist-types/generated/graphqlClient/schema';

import settings from '@base/settings.json';
import { clearCookie, setCookie, getCookie } from '@utils/cookies';
import { getProject, getSubscription } from './api/api';

export const useAuthentication = () => {
  const { user, setShowAuthFlow, authToken, handleLogOut } =
    useDynamicContext();

  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
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
    if (!authToken) return;
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

      const newToken = data?.loginWithDynamic;
      if (!newToken) return;
      setIsAuthenticating(false);
      return newToken;
    } catch (error) {
      setIsAuthenticating(false);
      console.error('Failed to fetch GraphQL token:', error);
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
        authorization: `Bearer ${getCookie(settings.site.auth.authTokenCookieKey)}`,
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

  const loadSubscriptions = async (projectId: string) => {
    setActiveSubscriptions(undefined);
    const token = getCookie(settings.site.auth.authTokenCookieKey);
    if (!token) return false;

    const decodedToken = decodeAccessToken({ token });
    if (!decodedToken?.projectId || decodedToken.projectId !== projectId)
      return false;

    const projectResponse = await getProject(projectId, token);
    console.log('🚀 ~ loadSubscriptions > projectResponse:', projectResponse);
    if (!projectResponse.ok || !projectResponse?.data?.teamId) return false;

    const subscriptionResponse = await getSubscription(projectId, token);
    console.log(
      '🚀 ~ loadSubscriptions > subscriptionResponse:',
      subscriptionResponse,
    );
    if (!subscriptionResponse.ok || !subscriptionResponse?.data?.items)
      return false;

    setActiveSubscriptions(subscriptionResponse.data.items);
  };

  const login = async (): Promise<boolean> => {
    if (isLoggedIn()) return Promise.resolve(true);

    setIsAuthenticating(true);
    setShowAuthFlow(true);

    await initializeProjects();

    return new Promise<boolean>((resolve, reject) => {
      loginPromiseRef.current = { resolve, reject };
    });
  };

  const logout = () => {
    setUserActiveProject(undefined);
    setUserProjects([]);
    clearCookie(settings.site.auth.authTokenCookieKey);
    clearCookie(settings.site.auth.activeProjectCookieKey);
    handleLogOut();
  };

  const setActiveProject = async (projectId?: string) => {
    if (!projectId) return;
    setCookie(settings.site.auth.activeProjectCookieKey, projectId, 30);
    setUserActiveProject(projectId);
    loadSubscriptions(projectId);
  };

  const initializeProjects = async () => {
    if (isLoadingProjects) return;

    const token = getCookie(settings.site.auth.authTokenCookieKey);
    if (!token) {
      await updateTokenFromProjectId();
    }

    setIsLoadingProjects(true);

    try {
      const projects = await fetchGraphQLUserProjects();
      if (projects && projects.length) {
        setUserProjects(projects);

        const activeProjectIdFromCookies = getCookie(
          settings.site.auth.activeProjectCookieKey,
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
      return false;
    } finally {
      setIsLoadingProjects(false);
      return true;
    }
  };

  const isLoggedIn = useCallback((): boolean => {
    const token = getCookie(settings.site.auth.authTokenCookieKey);
    if (!token) return false;
    const decodedToken = decodeAccessToken({ token });

    return !!user && decodedToken.projectId === userActiveProject;
  }, [user, getCookie]);

  const updateTokenFromProjectId = async (projectId?: string) => {
    const token = await fetchGraphQLToken(projectId);
    if (token) {
      const parsedToken = decodeAccessToken({ token });
      setCookie(settings.site.auth.authTokenCookieKey, token, parsedToken.exp);

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
    if (user && (!userProjects || userProjects.length <= 0)) {
      initializeProjects();
    }
  }, [user, userProjects]);

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
