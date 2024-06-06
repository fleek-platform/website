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
    className?: string;
  };
  btnBg?: string;
  fontColor?: string;
  hoverBtnBg?: string;
};
export type PlanSection = Record<string, string | number | boolean>;
export type PlanKeys = 'wagmi' | 'pro' | 'enterprise';
export type Plan = {
  features: Record<SectionKey, PlanSection>;
  header: PlanHeader;
};
