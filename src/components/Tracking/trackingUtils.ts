import { isProd } from '@utils/common';
import type { TriggerTrackingEventFn } from './types';

export const trackCustomEvent: TriggerTrackingEventFn = (
  eventName,
  eventProperties,
) => {
  const LOGGER = !isProd;

  if (window.posthog) {
    if (!window.posthog.isFeatureEnabled('enable-ai-agent-wizard-tracking')) {
      return;
    }

    window.posthog.capture(eventName, eventProperties);
  }

  if (LOGGER) {
    console.log('📊 ~ trackCustomEvent', { eventName, eventProperties });
  }
};

export default { trackCustomEvent };
