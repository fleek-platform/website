import posthog from 'posthog-js';

const LOGGER = true;

const trackCustomEvent = (eventName: string, eventProperties?: any) => {
  window.posthog.capture(eventName, eventProperties);

  if (LOGGER) {
    console.log('📊 ~ trackCustomEvent', { eventName, eventProperties });
  }
};

const trackingUtils = { trackCustomEvent };

export default trackingUtils;
