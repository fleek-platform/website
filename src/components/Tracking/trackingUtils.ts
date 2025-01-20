const DRY_RUN = false;

const getEnabledTrackers = () => ({
  posthog: !!window?.posthog,
  plausible: !!window?.plausible,
  twitter: !!window?.twq,
});

const trackCustomEvent = (eventName: string, eventProperties?: any) => {
  if (DRY_RUN) {
    console.log('📊 ~ trackCustomEvent', { eventName, eventProperties });
    return;
  }

  const trackers = getEnabledTrackers();

  if (trackers.posthog) {
    window.posthog.capture(eventName, eventProperties);
  }

  if (trackers.plausible) {
  }

  if (trackers.twitter) {
  }
};

const trackingUtils = { trackCustomEvent };

export default trackingUtils;
