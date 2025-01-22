const LOGGER = true;

const trackCustomEvent = (eventName: string, eventProperties?: any) => {
  //@ts-ignore
  if (!window.posthog.isFeatureEnabled('enable-ai-agent-wizard-tracking')) {
    return;
  }

  //@ts-ignore
  window.posthog.capture(eventName, eventProperties);

  if (LOGGER) {
    console.log('📊 ~ trackCustomEvent', { eventName, eventProperties });
  }
};

const trackingUtils = { trackCustomEvent };

export default trackingUtils;
