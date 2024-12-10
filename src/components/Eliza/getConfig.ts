const BASE_URL =
  'https://mock-7b0af73643ef40da86a591a5080edb81.mock.insomnia.rest';

const getConfig = () => {
  return {
    triggerDeploymentUrl: `${BASE_URL}/deploy`,
    getDeploymentStatusUrl: `${BASE_URL}/deployment/status`,
  };
};

export default getConfig;
