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

 files.forEach(file => {
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
}
