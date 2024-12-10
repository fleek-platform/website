// @ts-nocheck

// Mock function to trigger the deployment
// TODO: needs implementation
export const triggerDeployment = async (
  characterFile: string,
  envFile: string,
  someToken: string,
) => {
  return new Promise<{ ok: boolean }>((resolve) =>
    setTimeout(() => resolve({ ok: true }), 1000),
  );
};

// Mock function to get the deployment status
// TODO: needs implementation
const INIT_RESPONSE = {
  // I know, I know... this is a mock. bear with me...
  'Checking LLM balance': 'pending',
  'Formatting characterfile': 'pending',
  'Formatting .env file': 'pending',
  'Checking systems': 'pending',
  'Starting Fleek Machine': 'pending',
  'Entering the enclave': 'pending',
  'Validating AI operations': 'pending',
  'Finalizing details': 'pending',
};

let TEMP_RESPONSE = { ...INIT_RESPONSE };

export const getDeploymentStatus = async (
  someDeploymentId: string,
  someToken: string,
) => {
  return new Promise<{
    ok: boolean;
    data: {
      status: { [key: string]: 'success' | 'failed' | 'pending' };
      fleekMachineUrl?: string;
    };
  }>((resolve, reject) =>
    setTimeout(() => {
      Object.entries(TEMP_RESPONSE).some(([key, value]) => {
        if (value === 'pending') {
          TEMP_RESPONSE[key] = Math.random() < 0.02 ? 'failed' : 'success';
          if (TEMP_RESPONSE[key] === 'failed') {
            console.error(
              'YOU WILL SUFFER A NOT RANDOM CRITICAL FAILURE - at least you know why it will fail',
            );
          }
          return true;
        }
        return false;
      });

      const isComplete = Object.values(TEMP_RESPONSE).every(
        (value) => value === 'success',
      );

      if (Math.random() < 0.01) {
        console.error('YOU WILL SUFFER A RANDOM CRITICAL FAILURE');
        reject(new Error('Operation failed due to a random failure.'));
        return;
      }

      resolve({
        ok: true,
        data: {
          status: { ...TEMP_RESPONSE },
          fleekMachineUrl: isComplete ? 'https://fleek.machine.url' : undefined,
        },
      });
    }, 750),
  ).then((result) => {
    if (
      Object.values(TEMP_RESPONSE).every((value) => value === 'success') ||
      Object.values(TEMP_RESPONSE).some((value) => value === 'failed')
    ) {
      TEMP_RESPONSE = { ...INIT_RESPONSE };
    }
    return result;
  });
};
