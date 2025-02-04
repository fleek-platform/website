import {
  executeGraphQLOperation,
  type ExecGraphQLOperationResult,
} from './graphql-client';

/*------------------ Input types  -----------------*/

type TemplatesPaginationInput = Partial<{
  match: string;
  page: number;
  sortField: 'createdAt' | 'name';
  sortOrder: 'asc' | 'desc';
  take: number;
}>;

type TemplatesWhereInput = Partial<{
  categoryId: string;
  createdById: string;
  frameworkId: string;
  name: string;
}>;

export type FetchTemplatesVariables = Partial<{
  where: TemplatesWhereInput;
  filter: TemplatesPaginationInput;
}>;

/*------------------ Output types  -----------------*/

type SiteFramework = {
  __typename?: 'SiteFramework';
  id: string;
  name: string;
  avatar: any;
};

type Deployment = {
  __typename?: 'Deployment';
  id: string;
  previewImageUrl?: string;
  sourceRepositoryOwner?: string;
};

type User = {
  __typename?: 'User';
  id: string;
  username?: string;
  avatar?: any;
};

type TemplateCategory = {
  __typename?: 'TemplateCategory';
  id: string;
  name: string;
  slug: string;
};

type TemplateReviewStatus = 'APPROVED' | 'PENDING' | 'REJECTED';

export type Template = {
  __typename?: 'Template';
  id: string;
  name: string;
  category: TemplateCategory;
  creator?: User;
  deployment: Deployment;
  framework?: SiteFramework;
  reviewStatus: TemplateReviewStatus;
  banner: File;
  createdAt: string;
  description: string;
  reviewComment?: string;
  reviewedAt?: string;
  /** @deprecated It will be deleted because of security reasons before next release. */
  // site: Site; // omit this
  siteAvatar?: File;
  siteId: string;
  siteSlug: string;
  updatedAt: string;
  usageCount: number;
};

export type TemplatesWithAggregation = {
  __typename?: 'TemplatesWithAggregation';
  currentPage: number;
  data: Template[];
  isFirstPage: boolean;
  isLastPage: boolean;
  nextPage?: number;
  pageCount: number;
  previousPage?: number;
  totalCount: number;
};

/*------------------ Query -----------------*/

export const fetchTemplates = async (
  graphqlApiUrl: string,
  variables: FetchTemplatesVariables = {
    filter: { page: 1, take: 12 },
    where: { name: '' },
  },
): Promise<ExecGraphQLOperationResult<TemplatesWithAggregation>> =>
  executeGraphQLOperation<FetchTemplatesVariables, TemplatesWithAggregation>(
    graphqlApiUrl,
    {
      operationName: 'templates',
      query: `
      query templates($where: TemplatesWhereInput!, $filter: TemplatesPaginationInput) {
        templates(where: $where, filter: $filter) {
          data {
            id
            name
            description
            usageCount
            banner
            siteId
            siteAvatar
            siteSlug
            framework {
              id
              name
              avatar
              __typename
            }
            deployment {
              id
              previewImageUrl
              sourceRepositoryOwner
              __typename
            }
            creator {
              id
              username
              avatar
              __typename
            }
            category {
              id
              name
              slug
              __typename
            }
            reviewStatus
            reviewComment
            createdAt
            updatedAt
            __typename
          }
          currentPage
          nextPage
          isLastPage
          totalCount
          __typename
        }
      }
    `,
      variables,
      dataField: 'templates',
    },
  );
