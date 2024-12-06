import type { Repo } from './../../../Services/Github/types';

type DynamicTemplateData = {
  usageCount?: number;
  readmeData?: string;
};

export type Framework = {
  name: string;
  avatar: string;
};

export type Category = {
  name: string;
};

export type Template = {
  id: string;
  name: string;
  slug: string;
  description: string;
  banner: string;
  fleekDeploymentUrl: string;
  demoUrl: string;
  framework: Framework;
  dynamicData?: DynamicTemplateData;
  repository: Omit<Repo, 'description' | 'contributors_url'>;
  category: Category;
  screenshots: string[];
  similarTemplateIds: string[];
};
