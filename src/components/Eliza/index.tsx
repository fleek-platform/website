import React, { useEffect, useState } from 'react';
import { ElizaIntegrationLayer } from './ElizaIntegrationLayer';
import { isServer } from '@utils/common';

const Eliza: React.FC = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const enableMocking = async () => {
      if (process.env.NODE_ENV !== 'development' || isServer) {
        return;
      }
      // Dynamically import and start the MSW worker
      const { worker } = await import('@base/mocks/browser');
      await worker.start();
      setIsReady(true);
      console.log('MSW Mock Service Worker started');
    };

    enableMocking();
  }, []);

  return isReady ? <ElizaIntegrationLayer /> : null;
};

export default Eliza;
