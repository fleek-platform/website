import { isProd } from '@utils/common';
import {
  AgentUIEventTypes,
  type CaptureEventFn,
} from '@fleek-platform/agents-ui';

const X_PIXEL_EVENT_IDS = {
  AI_AGENT_PURCHASE: 'tw-o2hcd-p27pq',
};

export const captureEvent: CaptureEventFn = (eventName, eventProperties) => {
  if (!isProd) {
    console.log('📊 ~ captureEvent', { eventName, eventProperties });
    return;
  }

  if (
    !window.posthog ||
    !window?.posthog?.isFeatureEnabled('enable-ai-agent-wizard-tracking')
  )
    return;

  window.posthog.capture(eventName, eventProperties);

  if (
    window.twq &&
    eventName === AgentUIEventTypes.SUBSCRIPTION.PURCHASE_POLLING.COMPLETED &&
    eventProperties?.msg === 'success'
  ) {
    window.twq('event', X_PIXEL_EVENT_IDS.AI_AGENT_PURCHASE, {
      value: eventProperties?.conversionValue || undefined,
      email_address: eventProperties?.userEmail || undefined,
    });
  }
};

export default { captureEvent };
