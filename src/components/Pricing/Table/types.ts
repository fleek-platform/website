import type { buttonVariants } from '@components/Button';
import type { VariantProps } from 'class-variance-authority';

// TODO: Check the purpose of type as original is next/image
type StaticImageData = string;

// Features
export type FeaturePricing = { sharedPricing?: string } & Record<
  string,
  string | number | boolean
>;

// Sections
export type SectionKey =
  | 'compute'
  | 'bandwidth'
  | 'hosting'
  | 'storage'
  | 'platform'
  | 'onchainFeatures';
export type SectionFeatures = Record<
  SectionKey,
  {
    icon: StaticImageData;
    title: string;
    features: Record<string, string>;
    overage: string[];
  }
>;

// Plans
export type PlanHeader = {
  title: string;
  titleClassName: string;
  subtitle: string;
  description: string;
  cta: {
    text: string;
    href: string;
    variant?: VariantProps<typeof buttonVariants>['variant'];
  };
};
export type PlanSection = Record<string, string | number | boolean>;
export type PlanKeys = 'pro' | 'enterprise';
export type Plan = {
  features: Record<SectionKey, PlanSection>;
  header: PlanHeader;
};
