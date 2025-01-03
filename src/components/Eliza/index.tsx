import React, { useEffect, useState } from 'react';
import { ElizaIntegrationLayer } from './ElizaIntegrationLayer';
import { isServer } from '@utils/common';
import settings from '@base/settings.json';

const Eliza: React.FC = () => {
  const [isReady, setIsReady] = useState(!settings.site.mocksEnabled);

  useEffect(() => {
    const enableMocking = async () => {
      if (
        import.meta.env.MODE === 'production' ||
        typeof window === 'undefined'
      ) {
        return;
      }
      const { setupWorker } = await import('msw/browser');
      const { handlers } = await import('@base/mocks/handlers');
      const worker = setupWorker(...handlers);
      worker.start();
    };

    enableMocking();
  }, []);

  return isReady ? <ElizaIntegrationLayer /> : null;
};

export default Eliza;
