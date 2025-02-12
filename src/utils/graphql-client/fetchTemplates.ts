import {
  executeGraphQLOperation,
  type ExecGraphQLOperationResult,
} from './graphqlClient';

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

// GraphQL actually returns nulls
type Maybe<T> = T | null;

export type SiteFramework = {
  __typename?: 'SiteFramework';
  id: string;
  name: string;
  avatar: any;
};

type Deployment = {
  __typename?: 'Deployment';
  id: string;
  previewImageUrl?: Maybe<string>;
  sourceRepositoryOwner?: Maybe<string>;
  sourceRepositoryName?: Maybe<string>;
  sourceProvider?: Maybe<SourceProvider>;
};

// enums originally, check in the response
type SourceProvider = 'BITBUCKET' | 'GITHUB' | 'GITLAB';

export type User = {
  __typename?: 'User';
  id: string;
  username?: string;
  avatar?: any;
  firstName?: string;
};

export type TemplateCategory = {
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
  creator?: Maybe<User>;
  deployment: Deployment;
  framework?: Maybe<SiteFramework>;
  reviewStatus: TemplateReviewStatus;
  // any originally, set it as string
  banner: string;
  createdAt: string;
  description: string;
  reviewComment?: Maybe<string>;
  reviewedAt?: Maybe<string>;
  /** @deprecated It will be deleted because of security reasons before next release. */
  // site: Site; // omit this
  siteAvatar?: Maybe<string>;
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
  nextPage?: Maybe<number>;
  pageCount: number;
  previousPage?: Maybe<number>;
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
