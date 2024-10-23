export type FeatureSupport = boolean | null;

export interface Framework {
  name: string;
  ssg: FeatureSupport;
  ssr: FeatureSupport;
  apiRoutes: FeatureSupport;
  isr: FeatureSupport;
  fleekFunctions: FeatureSupport;
  previewDeployments: FeatureSupport;
}

export interface Feature {
  key: keyof Omit<Framework, 'name'>;
  name: string;
}
