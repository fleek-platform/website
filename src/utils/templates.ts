import type { Template as TemplateGraphQL } from '@base/graphql/fetch-templates';
import type { Template as TemplateJson } from '@components/Templates';

const nonNull = <T>(value: T | null): T | undefined => value || undefined;

const siteSlugDomain = import.meta.env.PUBLIC_UI_SITE_SLUG_DOMAIN;
if (!siteSlugDomain) {
  throw new Error('Site slug domain is required to generate demo link');
}

/**
 * Transform template object shape from GraphQL to old templates.json.
 * This way rendering logic can remain unchanged.
 */
export const transformTemplates = (
  templateGraphQL: TemplateGraphQL,
): TemplateJson => {
  const repositoryOwner = nonNull(
    templateGraphQL.deployment.sourceRepositoryOwner,
  );
  const repositorySlug = nonNull(
    templateGraphQL.deployment.sourceRepositoryName,
  );
  const repositoryProvider = templateGraphQL.deployment.sourceProvider;

  // Todo: review this, make it strict or fallback to empty string for now
  const repositoryHtmlUrl =
    repositoryProvider && repositoryOwner && repositorySlug
      ? `https://${repositoryProvider.toLocaleLowerCase()}.com/${repositoryOwner}/${repositorySlug}`
      : '';

  const templateCreator = templateGraphQL.creator?.username
    ? [
        {
          login: templateGraphQL.creator.username,
          name: templateGraphQL.creator.firstName,
          avatar_url: templateGraphQL.creator.avatar,
        },
      ]
    : undefined;

  return {
    id: templateGraphQL.id,
    name: templateGraphQL.name,
    slug: templateGraphQL.siteSlug,
    description: templateGraphQL.description,

    // Todo: resolve this field and set type
    // banner: templateGraphQL.banner, // protected currently
    banner: 'https://fleek.xyz/images/templates/astro-boilerplate.webp',

    // points back to deployment page in dashboard
    // should go to url like this:
    // https://app.fleek.xyz/projects/cm4wno6b90001z9tzd3x2e1wr/sites/new/?templateId=clx3f5nem000333n7acqcxiwj
    // `${import.meta.env.PUBLIC_UI_APP_URL}projects${projectId}/sites/new/?templateId=${templateGraphQL.id}`
    // at this point only pass templateId, full link includes projectId and must be generated on the client
    fleekDeploymentUrl: templateGraphQL.id,
    demoUrl: `https://${templateGraphQL.siteSlug}${siteSlugDomain}`,

    dynamicData: {
      usageCount: templateGraphQL.usageCount,
    },
    category: { name: templateGraphQL.category.name },

    // framework is optional, fall back is gear icon and 'No framework' text
    framework: nonNull(templateGraphQL.framework),

    // Todo: repository field should be replaced with deployment in the type and JSX
    // that will break compatibility with json
    repository: {
      // name of the template and name of repository always equal?
      name: templateGraphQL.name,
      // non existing in the graphql but required in website
      // generated from owner and slug
      html_url: repositoryHtmlUrl,
      owner: repositoryOwner,
      // this one is actually never returned but very needed
      // values will need to be included in database
      slug: repositorySlug,
      // maps to template.creator, always single item
      contributors: templateCreator,
      creation_date: templateGraphQL.createdAt,
    },

    // only a single screenshot is returned from graphql and supported in the UI
    screenshot: nonNull(templateGraphQL.deployment.previewImageUrl),
  };
};

export const randomizeArray = <T>(array: T[]): T[] =>
  array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
