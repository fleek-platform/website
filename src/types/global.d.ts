export {};

declare global {
  interface Window {
    posthog?: {
      isFeatureEnabled: (featureFlag: string) => boolean;
      capture: (eventName: string, eventProperties?: unknown) => void;
    };
  }
}
