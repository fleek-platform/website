import type { Template, User } from '@utils/graphql-client/fetchTemplates';
import { isClient } from '@utils/common';

const appUrl = import.meta.env.PUBLIC_UI_APP_URL;
if (!appUrl) {
  throw new Error('App url is required to generate template deployment link');
}

const siteSlugDomain = import.meta.env.PUBLIC_UI_SITE_SLUG_DOMAIN;
if (!siteSlugDomain) {
  throw new Error('Site slug domain is required to generate demo link');
}

const nonNull = <T>(value: T | null): T | undefined => value || undefined;

export const randomizeArray = <T>(array: T[]): T[] =>
  array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);

/**
 * Points back to deployment page in dashboard.
 *
 * @example https://app.fleek.xyz/projects/cm4wno6b90001z9tzd3x2e1wr/sites/new/?templateId=clx3f5nem000333n7acqcxiwj
 *
 * @param {string} projectId - Available on client only.
 * @param {string} templateId - Retrieved from GraphQL.
 * @returns {string} The absolute URL to the deployment page in the dashboard.
 */
export const getDeploymentUrl = (
  projectId: string,
  templateId: string,
): string => {
  if (!isClient) return '';

  const deploymentUrl = `${appUrl}projects/${projectId}/sites/new/?templateId=${templateId}`;

  return deploymentUrl;
};

export const getDemoUrl = (siteSlug: string): string =>
  `https://${siteSlug}${siteSlugDomain}`;

// Todo: what is required, what is optional?
export type GitRepository = {
  name: string;
  repositoryUrl: string;
  owner?: string;
  creator?: User;
  createdAt?: string;
  slug?: string;
};

export const getRepository = (template: Template): GitRepository => {
  const deployment = template?.deployment;

  if (!deployment) {
    throw Error(
      `👹 Oops! Deployment key missing in template response, template.name: ${template.name}`,
    );
  }

  const { sourceRepositoryOwner, sourceRepositoryName, sourceProvider } =
    deployment;

  const repositoryUrl =
    sourceProvider && sourceRepositoryOwner && sourceRepositoryName
      ? `https://${sourceProvider.toLocaleLowerCase()}.com/${sourceRepositoryOwner}/${sourceRepositoryName}`
      : '';

  return {
    // name of the template and name of repository always equal?
    name: template.name,
    // always single item
    creator: nonNull(template.creator),
    createdAt: template.createdAt,
    // non existing in the graphql but required in website
    // generated from owner and slug
    repositoryUrl,
    owner: nonNull(sourceRepositoryOwner),
    // this one is actually never returned but very needed
    // values will need to be included in database
    slug: nonNull(sourceRepositoryName),
  };
};
