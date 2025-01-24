export type CaptureEventFn = (
  eventName: string,
  eventProperties?: Record<string, string | boolean | undefined>,
) => void;
