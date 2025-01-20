import { PostHog } from 'posthog-js';

interface Window {
  posthog?: typeof PostHog;
  plausible?: any;
  twq?: any;
}
