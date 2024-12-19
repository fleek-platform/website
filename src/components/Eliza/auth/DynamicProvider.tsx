import { useContext, type FC } from 'react';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import {
  DynamicContextProvider,
  DynamicWidget,
} from '@dynamic-labs/sdk-react-core';
import { getAuthToken } from '@dynamic-labs/sdk-react-core';
import { decodeAccessToken } from '@fleek-platform/utils-token';
import { clearCookie, setCookie } from '../utils/cookies';
import {
  AUTH_TOKEN_NAME,
  DYNAMIC_ENVIRONMENT_ID,
  GRAPHQL_URL,
} from '../utils/contants';
import { AuthPromiseContext } from '../index';

export const DynamicProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { loginPromiseResolveRef } = useContext(AuthPromiseContext);

  const handleLogout = () => {
    clearCookie('authProviderToken');
    clearCookie('accessToken');
  };

  const handleAuthSuccess = async () => {
    const authToken = getAuthToken();
    if (!authToken) return '';

    const query = `mutation loginWithDynamic($data: LoginWithDynamicDataInput!) {
        loginWithDynamic(data: $data)
      }`;

    const variables = {
      data: {
        authToken: authToken,
      },
    };

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        operationName: 'loginWithDynamic',
        query: query,
        variables: variables,
      }),
    };

    try {
      const response = await fetch(GRAPHQL_URL, options);
      const { data } = await response.json();
      const parsedToken = decodeAccessToken({ token: data.loginWithDynamic });
      setCookie(AUTH_TOKEN_NAME, data.loginWithDynamic, parsedToken.exp);

      console.log('handleAuthSuccess called');
      console.log('loginPromiseResolveRef:', loginPromiseResolveRef);

      if (loginPromiseResolveRef.current) {
        console.log('✅ Resolving loginPromise with true');
        loginPromiseResolveRef.current(true);
        loginPromiseResolveRef.current = undefined;
      } else {
        console.log('❌ loginPromiseResolveRef.current is undefined');
      }
    } catch (requestError) {
      console.log(requestError);
    }
  };

  return (
    <DynamicContextProvider
      settings={{
        environmentId: DYNAMIC_ENVIRONMENT_ID,
        // @ts-ignore
        walletConnectors: [EthereumWalletConnectors],
        eventsCallbacks: {
          onLogout: handleLogout,
          onAuthSuccess: handleAuthSuccess,
        },
      }}
    >
      {children}
      <DynamicWidget />
    </DynamicContextProvider>
  );
};
