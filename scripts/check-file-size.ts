#!/usr/bin/env bun

import fs from 'fs';
import { execSync } from 'child_process';

// While the gif file is not video
// some users try to utilize it as such
const videoExt = ['mp4', 'webm', 'ogg', 'mov', 'avi', 'gif'];

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const MAX_FILE_SIZE_IN_MB = MAX_FILE_SIZE / 1024 / 1024;

const diff = execSync('git diff --cached --name-only');
const files = diff.toString().split('\n');

files.forEach((file) => {
  if (!file) return;

  if (!fs.existsSync(file)) {
    console.log(`🚴‍♀️Skipped! File ${file} not found!`);
    process.exit(0);
  }
  
  const stats = fs.statSync(file);
  const bytesSize = stats.size;
  const split = file.split('.');

  if (!split.length) return;

  const ext = split[0].toLowerCase();

  if (bytesSize > MAX_FILE_SIZE) {
    console.error(`👹 Oops! The file ${file} is too large. The maximum allowed size is ${MAX_FILE_SIZE_IN_MB}MB.`);

    if (videoExt.includes(ext)) {
      console.log('💡 For large video files is much preferred to upload to a proper video streaming service, such as YouTube. Please consider uploading to YouTube and using the video code snippet.');
    }
    
    process.exit(1);
  }
});
