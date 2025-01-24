import { isProd } from '@utils/common';
import type { CaptureEventFn } from './types';

export const captureEvent: CaptureEventFn = (eventName, eventProperties) => {
  const LOGGER = !isProd;

  if (window.posthog) {
    if (!window.posthog.isFeatureEnabled('enable-ai-agent-wizard-tracking')) {
      return;
    }

    window.posthog.capture(eventName, eventProperties);
  }

  if (LOGGER) {
    console.log('📊 ~ captureEvent', { eventName, eventProperties });
  }
};

export default { captureEvent };
