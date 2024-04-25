// TODO: Check the purpose of type as original is next/image
type StaticImageData = string;

// Features
export type FeaturePricing = { sharedPricing?: string } & Record<
  string,
  string | number
>;

// Sections
export type SectionKey =
  | 'storage'
  | 'hosting'
  | 'bandwidth'
  | 'compute'
  | 'features'
  | 'support';
export type SectionFeatures = Record<
  SectionKey,
  { icon: StaticImageData; title: string; features: Record<string, string> }
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
    className?: string;
  };
};
export type PlanSection = Record<string, string | number>;
export type PlanKeys = 'wagmi' | 'pro' | 'enterprise';
export type Plan = {
  features: Record<SectionKey, PlanSection>;
  header: PlanHeader;
};
