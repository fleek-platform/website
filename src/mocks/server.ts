import { setupServer } from 'msw/node';
import { handlers } from './handlers';

let isServerListening = false;

export const server = setupServer(...handlers);

export const setupMockServer = () => {
  if (!isServerListening) {
    server.listen();
    isServerListening = true;
  }
};

export const teardownMockServer = () => {
  if (isServerListening) {
    server.close();
    isServerListening = false;
  }
};
