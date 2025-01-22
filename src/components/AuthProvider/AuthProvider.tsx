import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import {
  DynamicContextProvider,
  DynamicWidget,
} from '@dynamic-labs/sdk-react-core';
import { isClient } from '@utils/common';
import { createContext, useMemo, useState } from 'react';

const DYNAMIC_ENV_ID =
  import.meta.env?.PUBLIC_DYNAMIC_ENVIRONMENT_ID || 'UNAVAILABLE';

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
  if (DYNAMIC_ENV_ID === 'UNAVAILABLE') {
    console.error(
      'Dynamic Provider forces the env var PUBLIC_DYNAMIC_ENVIRONMENT_ID to be non-nullable:',
      {
        PUBLIC_DYNAMIC_ENVIRONMENT_ID: import.meta.env
          ?.PUBLIC_DYNAMIC_ENVIRONMENT_ID,
      },
    );
  }

  return (
    <AuthContext.Provider value={value}>
      <DynamicContextProvider
        settings={{
          environmentId: DYNAMIC_ENV_ID,
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
