import type { Template as TemplateGraphQL } from '@base/api/fetch-templates';
import type { Template as TemplateJson } from '@components/Templates';

const nonNull = <T>(value: T | null): T | undefined => value || undefined;

/**
 * Transform template object shape from GraphQL to old templates.json.
 * This way rendering logic can remain unchanged.
 */
export const transformTemplates = (
  templateGraphQL: TemplateGraphQL,
): TemplateJson => {
  return {
    id: templateGraphQL.id,
    name: templateGraphQL.name,
    slug: templateGraphQL.siteSlug,
    description: templateGraphQL.description,

    // banner: templateGraphQL.banner, // protected currently
    banner: 'https://fleek.xyz/images/templates/astro-boilerplate.webp',

    // Todo: handle this with env var
    // deployment page in dashboard
    fleekDeploymentUrl: 'https://app.fleek.xyz/' + templateGraphQL.id,
    demoUrl: templateGraphQL.siteSlug + '.on-fleek.app',

    dynamicData: {
      usageCount: templateGraphQL.usageCount,
    },
    category: { name: templateGraphQL.category.name },

    // unresolved yet

    // optional in graphql but required in website
    // rendering will need to handle optional
    framework: templateGraphQL.framework ?? {
      name: 'blank fallback',
      avatar: 'blank fallback',
    },

    repository: {
      // name of the template and name of repository always equal?
      name: templateGraphQL.name,
      // non existing in the graphql but required in website
      // possibly can be generated from owner and slug
      html_url: 'blank for now',
      owner: nonNull(templateGraphQL.deployment.sourceRepositoryOwner),
      // this one is actually never returned but very needed
      // values will need to be included in database
      slug: nonNull(templateGraphQL.deployment.sourceRepositoryName),
      // contributors?: Contributor[];
      // creation_date?: string;
    },
    screenshots: [templateGraphQL.deployment.previewImageUrl!],
    similarTemplateIds: [],
  };
};
