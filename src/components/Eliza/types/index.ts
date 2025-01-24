export type TriggerTrackingEventFn = (
  eventName: string,
  eventProperties?: Record<string, string | boolean | undefined>,
) => void;
