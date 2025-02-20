import { isProd } from '@utils/common';
import {
  AgentUIEventTypes,
  type CaptureEventFn,
} from '@fleek-platform/agents-ui';

const X_PIXEL_EVENT_IDS = {
  AI_AGENT_PURCHASE: 'tw-o2hcd-p27pq',
  AI_AGENT_JOURNEY_UNIT: 'tw-o2hcd-ozmgv',
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

  if (!window.twq) return;

  if (
    eventName === AgentUIEventTypes.SUBSCRIPTION.PURCHASE_POLLING.COMPLETED &&
    eventProperties?.msg === 'success'
  ) {
    window.twq('event', X_PIXEL_EVENT_IDS.AI_AGENT_PURCHASE, {
      value: eventProperties?.['conversion_value'] || undefined,
      email_address: eventProperties?.['user_email'] || undefined,
    });
  }

  if (eventName === AgentUIEventTypes.JOURNEY_INIT) {
    window.twq('event', X_PIXEL_EVENT_IDS.AI_AGENT_JOURNEY_UNIT);
  }
};

export default { captureEvent };
