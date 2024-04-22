#!/usr/bin/env bun

import fs from 'fs';
import path from 'path';

const dirToValidate = [
  './src',
];

const validateJson = (filepath: string) => {
  try {
    const fileContent = fs.readFileSync(filepath, 'utf8');
    JSON.parse(fileContent);
    console.log(`✅ Great! Successfully validated the JSON file at ${filepath}`);
  } catch (err) {
    console.error(`👹 Oops! Failed to validate the JSON file at ${filepath}. Error:`, err);
    throw err;
  }
}

const validateJsonFilesInDirectory = ({ dirPath }: {
  dirPath: string;
}) => {
    fs.readdirSync(dirPath).forEach(file => {
        const computedPath = path.join(dirPath, file);
        if (fs.lstatSync(computedPath).isDirectory()) {
            validateJsonFilesInDirectory({
              dirPath: computedPath
            });
        } else if (path.extname(file) === '.json') {
          validateJson(computedPath);
        }
    });
}

dirToValidate.forEach((dirPath) => {
  validateJsonFilesInDirectory({
    dirPath,
  });
})
