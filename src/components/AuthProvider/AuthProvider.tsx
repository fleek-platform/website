import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import {
  DynamicContextProvider,
  DynamicWidget,
} from '@dynamic-labs/sdk-react-core';
import settings from '@base/settings.json';
import { isClient } from '@utils/common';
import { createContext, useMemo, useState } from 'react';

type AuthState = 'logged-in' | 'logged-out' | 'logging-in';
interface AuthContextProps {
  authState: AuthState;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined,
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>('logging-in');
  const value = useMemo(() => ({ authState, setAuthState }), [authState]);

  return (
    <AuthContext.Provider value={value}>
      <DynamicContextProvider
        settings={{
          environmentId: settings.site.auth.dynamicEnvironmentId,
          // @ts-ignore
          walletConnectors: [EthereumWalletConnectors],
          cssOverrides: '.modal__items { scale: 1.5 }',
          events: {
            onAuthFailure: () => setAuthState('logged-out'),
            onAuthSuccess: () => setAuthState('logged-in'),
            onAuthInit: () => setAuthState('logging-in'),
            onAuthFlowCancel: () => setAuthState('logged-out'),
            onAuthFlowClose: () => setAuthState('logged-out'),
            onLogout: () => setAuthState('logged-out'),
          },
        }}
      >
        {children}
        <span className="hidden">{isClient && <DynamicWidget />}</span>
      </DynamicContextProvider>
    </AuthContext.Provider>
  );
};
