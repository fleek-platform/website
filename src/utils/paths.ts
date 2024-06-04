import fs from 'fs/promises';

export const listSubDirectories = async ({
  path,
}: {
  path: string;
}): Promise<string[]> => {
  try {
    const entries = await fs.readdir(path, { withFileTypes: true });
    const directories = entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);
    return directories;
  } catch (error) {
    console.error(`Error reading directory: ${error}`);
    return [];
  }
};

export const getPathSubDirsSorted = async ({
  path,
  extend,
}: {
  path: string;
  extend?: string[];
}) => {
  let ds = await listSubDirectories({
    path,
  });

  if (Array.isArray(extend)) {
    ds = [
      ...ds,
      ...extend,
    ]    
  }

  ds.map(item => item.toLowerCase());
  ds.sort((a, b) => a.localeCompare(b));

  return ds;
}
