import type {
  SiteFramework,
  TemplateCategory,
} from '@utils/graphql-client/fetchTemplates';

export type Framework = Pick<SiteFramework, 'name' | 'avatar'>;

export type Category = Pick<TemplateCategory, 'name'>;

export type Filters = {
  framework?: string;
  category?: string;
  search?: string;
};
