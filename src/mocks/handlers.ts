import { http, HttpResponse, passthrough } from 'msw';
import settings from '@base/settings.json';
import type { DeploymentStatus } from '@components/Eliza/hooks/useDeployAIAgent';

const INIT_RESPONSE: DeploymentStatus = {
  'Checking LLM balance': 'pending',
  'Formatting characterfile': 'pending',
  'Formatting .env file': 'pending',
  'Checking systems': 'pending',
  'Starting Fleek Machine': 'pending',
  'Entering the enclave': 'pending',
  'Validating AI operations': 'pending',
  'Finalizing details': 'pending',
};

let tempResponse: DeploymentStatus = { ...INIT_RESPONSE };
const FAILURE_RATE = 0.02;

export const handlers = [
  // TRIGGER AGENT DEPLOYMENT
  http.post<
    {},
    {
      characterfile: string;
      env: string;
    },
    {
      deploymentId: string;
    }
  >(
    settings.elizaPage.endpoints.triggerAgentDeployment,
    async ({ request }) => {
      const { characterfile, env } = await request.json();
      console.log('🐑 Mocked endpoint received body > { characterfile }:', {
        characterfile,
      });

      return HttpResponse.json({
        deploymentId: 'mockDeploymentId',
      });
    },
  ),

  // GET AGENT DEPLOYMENT STATUS
  http.get<
    { deploymentId: string },
    {},
    { status: DeploymentStatus; fleekMachineUrl?: string }
  >(
    `${settings.elizaPage.endpoints.getAgentDeploymentStatus}/:deploymentId`,
    async ({ params }) => {
      const { deploymentId } = params;
      console.log(
        '🐑 Mocked endpoint received param ~ deploymentId:',
        deploymentId,
      );
      await new Promise((resolve) => setTimeout(resolve, 750));

      for (const [step, status] of Object.entries(tempResponse)) {
        if (status === 'pending') {
          tempResponse[step] =
            Math.random() < FAILURE_RATE ? 'failed' : 'success';
          if (tempResponse[step] === 'failed') {
            console.error(
              `🐑❌ A mocked critical failure occurred during deployment at step: ${step}`,
            );
          }
          break;
        }
      }

      const isComplete = Object.values(tempResponse).every(
        (value) => value === 'success',
      );
      const responseData = {
        status: { ...tempResponse },
        fleekMachineUrl: isComplete ? 'https://fleek.machine.url' : undefined,
      };

      if (isComplete || Object.values(tempResponse).includes('failed')) {
        tempResponse = { ...INIT_RESPONSE };
      }

      return HttpResponse.json(responseData);
    },
  ),

  // GET Subscription
  http.get<
    {
      subscriptionId: string;
    },
    {},
    {
      items?: {
        id: string;
        status: string;
        startDate: string;
        periodEndDate: string;
        endDate: string | null;
        plan: {
          id: string;
          name: string;
          description: string;
          price: number;
          createdAt: string;
          updatedAt: string;
          metadata: Record<string, string>;
        };
      }[];
    }
  >(
    `${settings.site.auth.endpoints.subscriptions}/:subscriptionId`,
    async ({ params }) => {
      const { subscriptionId } = params;
      console.log(
        '🐑 Mocked endpoint received param ~ subscriptionId:',
        subscriptionId,
      );

      return HttpResponse.json({
        items: [
          {
            id: 'sub_1QagnCCEFZDhKYzKA3sZNJcJ',
            status: 'Active',
            startDate: '2024-12-27T16:53:42Z',
            periodEndDate: '2025-01-27T16:53:42Z',
            endDate: null,
            plan: {
              id: 'prod_RTe4k0fsOugr22',
              name: 'AI Agent',
              description:
                'Monthly subscription for the deployment of an AI agent through a Fleek Machine. ',
              price: 2000,
              createdAt: '2024-12-27T16:53:09Z',
              updatedAt: '2024-12-27T16:53:10Z',
              metadata: {},
            },
          },
        ],
      });
    },
  ),

  http.get<
    {},
    {},
    {
      id: string;
      name: string;
      description: string;
      price: number;
      createdAt: string;
      updatedAt: string;
      metadata: Record<string, string>;
    }[]
  >(settings.site.auth.endpoints.plans, async () => {
    return HttpResponse.json([
      {
        id: 'prod_RTe4k0fsOugr22',
        name: 'AI Agent',
        description:
          'Monthly subscription for the deployment of an AI agent through a Fleek Machine. ',
        price: 2000,
        createdAt: '2024-12-27T16:53:09Z',
        updatedAt: '2024-12-27T16:53:10Z',
        metadata: {},
      },
      {
        id: 'prod_R9lEXTVE9qp1DV',
        name: 'Pro',
        description: 'Our most popular plan for professional developers.',
        price: 2000,
        createdAt: '2024-11-04T14:56:25Z',
        updatedAt: '2024-11-04T15:45:25Z',
        metadata: {
          app: 'fleek-platform',
        },
      },
    ]);
  }),

  // PASSTHROUGH REQUESTS
  http.get('/svg/*', passthrough),
  http.get('/src/*', passthrough),
  http.post('https://graphql.service.fleek.xyz/graphql', passthrough),

  http.get('https://app.dynamicauth.com/*', passthrough),
  http.get('https://dynamic-static-assets.com/*', passthrough),
  http.post('https://app.dynamicauth.com/*', passthrough),
  http.get('https://iconic.dynamic-static-assets.com/*', passthrough),
  http.post('https://*.dynamicauth.com/*', passthrough),

  http.post('https://us.i.posthog.com/*', passthrough),

  http.get('https://cdn.jsdelivr.net/*', passthrough),

  http.get('https://api.fleek.xyz/api/v1/projects/*', passthrough),
  http.get('https://api.fleek.xyz/api/v1/teams/*', passthrough),
  http.get('https://api.fleek.xyz/api/v1/subscriptions/*', passthrough),
  http.get('https://assets.on-fleek.app/*', passthrough),
];
