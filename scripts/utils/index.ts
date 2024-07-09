import fs from 'fs';
import path from 'path';

export const listFilesRecursively = ({
  directory,
  fileList = [],
}: {
  directory: string;
  fileList?: string[];
}) => {
  const files = fs.readdirSync(directory);

  files.forEach((file) => {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      listFilesRecursively({
        directory: filePath,
        fileList,
      });
    } else {
      fileList.push(filePath);
    }
  });

  return fileList;
};

export const filterMdFiles = (filePaths: string[]) => {
  return filePaths.filter((filePath) => {
    const extension = path.extname(filePath);
    return extension === '.md' || extension === '.mdx';
  });
};

export const generateUrlPath = ({ filePath }: { filePath: string }) => {
  const baseDir = 'src/content/';

  if (!filePath.startsWith(baseDir)) {
    throw new Error(
      `👹 Oops! Unexpected file path, as it should start with the base directory ${baseDir}. Is there a new feature that requires implementation updates?`,
    );
  }

  const relativePath = filePath.substring(baseDir.length);

  const parts = relativePath.split(path.sep);

  const isIndexFile = parts[parts.length - 1].startsWith('index.');

  if (isIndexFile) parts.pop();

  // Note: Users may utilize the 'slug' field, which supersedes the default URL generation based on the filename.
  // Warning: As of this writing, deeply nested files with custom slugs do not function correctly in Astro.
  // For example, a file located at 'src/contents/docs/dir1/dir2/file-has-slug.md' may encounter issues.
  // Due to this limitation, it's advisable not to use 'slug' in markdown files.
  const url = `/${parts.join('/')}`;
  const regex = /(.*\/)(.*)\.(md|mdx)$/;
  const result = url.replace(regex, '$1').toLowerCase();

  return result;
};
