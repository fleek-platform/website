import '@fleek-platform/agents-ui/styles';

import { useEffect, useState } from 'react';
import { ChatBox, type FileWithPreview } from '@fleek-platform/agents-ui';
import { useAuthStore } from '@fleek-platform/login-button';
import { FLEEK_KEY_AGENTS_LEAD, storeFunnelData, clearFunnelData } from '@utils/funnel';
import { fileToBase64 } from '@utils/file';
import { clearCookie, setCookie } from '@utils/cookies';

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
      console.log('[debug] clear cookie fleek agents lead')
      clearCookie(FLEEK_KEY_AGENTS_LEAD);
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

    const fileDataPromises = files.map(file => fileToBase64(file));
    const fileDataArray = await Promise.all(fileDataPromises);

    const data = {
      description,
      files: fileDataArray.map((base64, index) => ({
        preview: base64,
        name: files[index].name,
        type: files[index].type,
        size: files[index].size
      }))
    };

    setCookie(FLEEK_KEY_AGENTS_LEAD, new Date().toISOString(), 1);
    storeFunnelData({
      key: 'fleek-xyz-agents-lead',
      data,
    });

    if (typeof triggerLoginModal !== 'function') {
      console.log('[debug] triggerLoginModal is not a fn!')

      return;
    }

    triggerLoginModal(true);
  };

  const onSuccess = () => {
    console.log('[debug] Submission successful');
  };

  const onError = (error: Error) => {
    console.error('[debug] Submission failed:', error);
  };

  return (
    <div className="agents-ui m-20 text-14">
      {
        isLoggingIn
        ? 'Logging...'
        : (          
          <ChatBox
            onSubmit={onSubmit}
            onSuccess={onSuccess}
            onError={onError}
            maxFileSize={MAX_FILE_SIZE}
          />
        )
      }
    </div>
  );
};

