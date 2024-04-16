import settings from "@base/settings.json";

export const getSiteUrl = (): string => {
 const env = process.env.NODE_ENV || 'staging';
 
 if (!(settings.site as any)[env]) {
    throw new Error(`👹 Oops! Environment "${env}" is not configured in settings.`);
 }
 
 return (settings.site as any)[env].url;
};
