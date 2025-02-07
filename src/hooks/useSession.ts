import { useAuthStore, type AuthStore } from '@fleek-platform/login-button';
import { isClient } from '@utils/common';
import { useProjects } from './useProjects';

export function useSession() {
  const {
    updateAccessTokenByProjectId,
    triggerLoginModal,
    isLoggingIn,
    isLoggedIn,
  } = (() => {
    if (!isClient) {
      return {
        accessToken: '',
        updateAccessTokenByProjectId: () => null,
        triggerLoginModal: () => null,
        isLoggingIn: true,
        isLoggedIn: false,
      } as unknown as AuthStore;
    }

    return useAuthStore();
  })();

  const { userProjects, setActiveProject, activeProjectId, fetchProjects } =
    (() => {
      if (!isClient) {
        return {
          userProjects: [],
          setActiveProject: () => null,
          activeProjectId: '',
          fetchProjects: () => null,
        } as unknown as ReturnType<typeof useProjects>;
      }

      return useProjects();
    })();

  const showProjectsDropDown = isLoggedIn && userProjects && activeProjectId;

  const login = () =>
    typeof triggerLoginModal === 'function' && triggerLoginModal(true);

  const handleLoginClick = (
    e?: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    e?.preventDefault();
    e?.stopPropagation();
    login();
  };

  return {
    userProjects,
    activeProjectId,
    setActiveProject,
    fetchProjects,
    showProjectsDropDown,
    isLoggingIn,
    isLoggedIn,
    handleLoginClick,
    updateAccessTokenByProjectId,
  };
}
