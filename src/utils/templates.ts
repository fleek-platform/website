import type { Template as TemplateGraphQL } from '@base/api/fetch-templates';
import type { Template as TemplateJson } from '@components/Templates';

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

    framework: templateGraphQL.framework ?? {
      name: 'blank fallback',
      avatar: 'blank fallback',
    },

    repository: {
      name: 'blank for now',
      html_url: 'blank for now',
      // owner?: string;
      // contributors?: Contributor[];
      // creation_date?: string;
      // slug?: string;
    },
    screenshots: [templateGraphQL.deployment.previewImageUrl!],
    similarTemplateIds: [],
  };
};
