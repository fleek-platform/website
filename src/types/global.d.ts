export {};

declare global {
  interface Window {
    posthog?: {
      isFeatureEnabled: (featureFlag: string) => boolean;
      capture: (eventName: string, eventProperties?: unknown) => void;
    };
    twq?: {
      (
        event: string,
        eventId: string,
        properties?: Record<string, string | number | boolean | undefined>,
      ): void;
    };
    promotekit_referral: string;
  }
}
