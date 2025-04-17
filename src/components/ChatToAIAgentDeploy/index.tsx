import '@fleek-platform/agents-ui/styles';
import {
  ChatBox,
  type FileWithPreview,
  DRAFT_BOOTSTRAP_DATA_KEY,
  ROUTE_NEW_DRAFT,
} from '@fleek-platform/agents-ui';
import { useAuthStore } from '@fleek-platform/login-button';
import { storeFunnelData } from '@utils/funnel';
import { fileToBase64 } from '@utils/file';
import { setReferralQueryKeyValuePair } from '@utils/referrals';

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const ChatToAIAgentDeploy = () => {
  const { triggerLoginModal, isLoggedIn } = useAuthStore();

  const onSubmit = async (description: string, files: FileWithPreview[]) => {
    console.log('[debug] Description:', description);
    console.log('[debug] Files:', files);

    // TODO: Validate data

    const fileDataPromises = files.map((file) => fileToBase64(file));
    const fileDataArray = await Promise.all(fileDataPromises);

    const data = {
      mode: 'chat',
      fromApp: 'website',
      prompt: description,
      timestamp: new Date(),
    };

    setReferralQueryKeyValuePair('agents');
    storeFunnelData({
      key: DRAFT_BOOTSTRAP_DATA_KEY,
      data,
    });

    if (isLoggedIn) {
      const currentParams = new URLSearchParams(window.location.search);

      const targetUrl = new URL(
        `${import.meta.env.PUBLIC_UI_AGENTS_APP_URL}${ROUTE_NEW_DRAFT}`,
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
