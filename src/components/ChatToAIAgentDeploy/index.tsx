import '@fleek-platform/agents-ui/styles';

import { useEffect } from 'react';
import {
  ChatBox,
  FLEEK_CONVERSATIONAL_FUNNEL_ROUTE_NAME,
  type FileWithPreview,
} from '@fleek-platform/agents-ui';
import { useAuthStore } from '@fleek-platform/login-button';
import { storeFunnelData } from '@utils/funnel';
import { fileToBase64 } from '@utils/file';
import { clearCookie, setCookie } from '@utils/cookies';
import { setReferralQueryKeyValuePair } from '@utils/referrals';

import { FLEEK_WEBSITE_CHAT_LEAD_KEY } from '@fleek-platform/agents-ui';

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const ChatToAIAgentDeploy = ({
  personagenEndpoint,
  agentsAppUrl,
}: {
  personagenEndpoint: string;
  agentsAppUrl: string;
}) => {
  const { triggerLoginModal, isLoggedIn, isLoggingIn } = useAuthStore();

  useEffect(() => {
    const clear = () => {
      console.log('[debug] clear cookie fleek agents lead');
      clearCookie(FLEEK_WEBSITE_CHAT_LEAD_KEY);
    };

    window.addEventListener('beforeunload', clear);

    return () => {
      window.removeEventListener('beforeunload', clear);
    };
  }, []);

  const onSubmit = async (description: string, files: FileWithPreview[]) => {
    console.log('[debug] Description:', description);
    console.log('[debug] Files:', files);

    // TODO: Validate data

    const fileDataPromises = files.map((file) => fileToBase64(file));
    const fileDataArray = await Promise.all(fileDataPromises);

    const data = {
      description,
      files: fileDataArray.map((base64, index) => ({
        preview: base64,
        name: files[index].name,
        type: files[index].type,
        size: files[index].size,
      })),
    };

    setReferralQueryKeyValuePair('agents');
    setCookie(FLEEK_WEBSITE_CHAT_LEAD_KEY, new Date().toISOString(), 1);
    storeFunnelData({
      key: FLEEK_WEBSITE_CHAT_LEAD_KEY,
      data,
    });

    if (isLoggedIn) {
      const currentParams = new URLSearchParams(window.location.search);

      const targetUrl = new URL(
        `${import.meta.env.PUBLIC_UI_AGENTS_APP_URL}/${FLEEK_CONVERSATIONAL_FUNNEL_ROUTE_NAME}`,
      );

      currentParams.forEach((value, key) => {
        targetUrl.searchParams.append(key, value);
      });

      window.location.assign(targetUrl.toString());

      return true;
    }

    if (typeof triggerLoginModal !== 'function') {
      console.log('[debug] triggerLoginModal is not a fn!');

      return false;
    }

    triggerLoginModal(true);

    return true;
  };

  const onSuccess = () => {
    console.log('[debug] Submission successful');
  };

  const onError = (error: Error) => {
    console.error('[debug] Submission failed:', error);
  };

  return (
    <div className="agents-ui m-20 w-full text-14">
      <div className="mx-auto w-[80rem]">
        <ChatBox
          onSubmit={onSubmit}
          onSuccess={onSuccess}
          onError={onError}
          maxFileSize={MAX_FILE_SIZE}
        />
      </div>
    </div>
  );
};
