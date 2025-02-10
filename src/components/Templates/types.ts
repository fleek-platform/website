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

export type Build = {
  baseDirectory?: string;
  buildCommand?: string;
  distDirectory?: string;
  dockerImage?: string;
};

export type Repository = Omit<Repo, 'description' | 'contributors_url'> & {
  // these are only used in dashboard for deployment, not in the website
  provider: string;
  branch: string;
  ref: string;
  build?: Build;
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
  repository: Repository;
  category: Category;
  screenshots: string[];
  similarTemplateIds: string[];
};

export type Filters = {
  framework?: string;
  category?: string;
  search?: string;
};
