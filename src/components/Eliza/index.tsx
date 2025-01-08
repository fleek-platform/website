import React, { useEffect, useState } from 'react';
import { ElizaIntegrationLayer } from './ElizaIntegrationLayer';
import { isProd, isServer } from '@utils/common';
import settings from '@base/settings.json';
import { InitialLoadingState } from '@components/Eliza/components/InitialLoadingState';

const Eliza: React.FC = () => {
  const [isReady, setIsReady] = useState(!settings.site.mocksEnabled);

  useEffect(() => {
    const enableMocking = async () => {
      if (isProd || isServer) {
        return;
      }
      const { worker } = await import('@base/mocks/browser');
      if (worker) {
        await worker.start();
      }

      setIsReady(true);
    };

    enableMocking();
  }, []);

  return isReady ? <ElizaIntegrationLayer /> : <InitialLoadingState />;
};

export default Eliza;
