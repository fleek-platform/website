type GenerateFullSlugProps = {
  basePath: string;
  slug: string;
};

export const generateFullSlug = ({ basePath, slug }: GenerateFullSlugProps) =>
  `${basePath}/${slug}`;
