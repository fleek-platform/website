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
  framework?: Framework;
  dynamicData?: DynamicTemplateData;
  // Todo: create separate type deployment with creator, single item
  repository: Omit<Repo, 'description' | 'contributors_url'>;
  category: Category;
  // always a single screenshot
  screenshot?: string;
};

export type Filters = {
  framework?: string;
  category?: string;
  search?: string;
};
