import settings from "@base/settings.json";
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

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

const fileExistsCaseInsensitive = ({
  dirname,
  filename,
}: {
  dirname: string;
  filename: string;
}) => {
  try {
    const filenames = fs.readdirSync(dirname);
    const lowerCasefilenameName = filename.toLowerCase();
    // return filenames.some(filename => filename.toLowerCase() === lowerCasefilenameName);

    const data = filenames.reduce((acc, curr) => {
      if (filename.toLowerCase() !== lowerCasefilenameName) return acc;

      return dirname;
    }, '');

    console.log('data ->', data);

    return filenames.some(filename => filename.toLowerCase() === lowerCasefilenameName);
  } catch (error) {
    return false;
  }
}

export const getDocumentUrl = ({
  pathname,
}: {
  pathname: string;
}) => {
  const currDir = fileURLToPath(import.meta.url);
  const root = currDir.split('src')[0];

  const dirname = path.join(root, 'src/content', pathname);
  const split = pathname.split('/');
  const slug = split[split.length - 1];

  const fileExist = (filename: string) => fileExistsCaseInsensitive({
    dirname,
    filename,
  });

  const possibleFilenames = [slug, "index.md"];

  const foundFile = possibleFilenames.find(file => fileExist(file));

  if (!foundFile) throw Error('Oops! Could not determine the URL');

  return `${pathname}/${foundFile}`;
}
