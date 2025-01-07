import { useRef } from 'react';
import { Toaster } from 'react-hot-toast';

import { getDeploymentStatus, triggerDeployment } from './api/api.ts';
import {
  SubscriptionModal,
  useSubscriptionModal,
} from './components/SubscriptionModal.tsx';
import { AuthProvider } from '@components/AuthProvider/AuthProvider.tsx';
import { getCookie } from '@utils/cookies.ts';
import { useAuthentication } from '@components/AuthProvider/useAuthentication.ts';
import { CoreEliza } from './CoreEliza.tsx';
import settings from '@base/settings.json';

export const ElizaIntegration: React.FC = () => {
  const { isLoggedIn, login, getActiveSubscriptions, userActiveProject } =
    useAuthentication();
  const { isSubscriptionModalVisible, setIsSubscriptionModalVisible } =
    useSubscriptionModal();
  const subscriptionModalCallbackRef = useRef<(value?: boolean) => void>();

  const triggerAgentDeployment = async (characterfile?: string) => {
    const token = getCookie(settings.site.auth.authTokenCookieKey);
    if (!token || !characterfile) return { ok: false };

    const res = await triggerDeployment(characterfile, token);

    return {
      ok: res.ok,
      deploymentId: res?.data?.deploymentId ?? undefined,
    };
  };

  const getAgentDeploymentStatus = async (deploymentId: string) => {
    const token = getCookie(settings.site.auth.authTokenCookieKey);
    if (!token) return { ok: false };

    return getDeploymentStatus(deploymentId, token);
  };

  const ensureUserSubscription = async (): Promise<boolean> => {
    if (settings.site.auth.disableSubscriptionValidation) return true;

    const activeSubscriptions = getActiveSubscriptions();

    // TODO: this logic has to be reviewed
    const hasEnoughAiModules = activeSubscriptions
      ? activeSubscriptions.filter((sub) => sub.plan.name === 'AI Agent')
          .length > 0
      : null;

    if (!hasEnoughAiModules) {
      setIsSubscriptionModalVisible(true);

      const result = await new Promise<boolean | undefined>((resolve) => {
        subscriptionModalCallbackRef.current = resolve;
      });

      return !!result;
    }

    return false;
  };

  return (
    <>
      <CoreEliza
        isLoggedIn={isLoggedIn}
        login={login}
        triggerAgentDeployment={triggerAgentDeployment}
        getAgentDeploymentStatus={getAgentDeploymentStatus}
        ensureUserSubscription={ensureUserSubscription}
      />

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#222222',
            color: '#fff',
            fontSize: '12px',
          },
        }}
      />

      <SubscriptionModal
        isVisible={isSubscriptionModalVisible}
        setIsVisible={setIsSubscriptionModalVisible}
        onSuccess={subscriptionModalCallbackRef.current}
        activeProjectId={userActiveProject}
      />
    </>
  );
};

export const ElizaIntegrationLayer: React.FC = () => (
  <AuthProvider>
    <ElizaIntegration />
  </AuthProvider>
);
