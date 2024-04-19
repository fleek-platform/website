import settings from "@base/settings.json";

export const getSiteUrl = (): string => {
 const env = process.env.NODE_ENV || 'staging';
 
 if (!(settings.site as any)[env]) {
    throw new Error(`👹 Oops! Environment "${env}" is not configured in settings.`);
 }
 
 return (settings.site as any)[env].url;
};

export const isActivePath = ({
  lookup,
  pathname,
}: {
  lookup: string;
  pathname?: string;
}) => {
  const basePath = (pathname || window.location.pathname).split('/').filter(Boolean)[0];

  const re = new RegExp(`^\\/${basePath}(\\/[^\/]+)?$`);

  return re.test(lookup);
}
