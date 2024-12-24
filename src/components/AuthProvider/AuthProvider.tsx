import { type FC } from 'react';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import {
  DynamicContextProvider,
  DynamicWidget,
} from '@dynamic-labs/sdk-react-core';
import settings from '@base/settings.json';
import { isClient } from '@utils/common';

export const AuthProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: settings.site.auth.dynamicEnvironmentId,
        // @ts-ignore
        walletConnectors: [EthereumWalletConnectors],
        cssOverrides: '.modal__items { scale: 1.5 }',
      }}
    >
      {children}
      <span className="hidden">{isClient && <DynamicWidget />}</span>
    </DynamicContextProvider>
  );
};
