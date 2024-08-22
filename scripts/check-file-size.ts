#!/usr/bin/env bun

import fs from 'fs';
import { execSync } from 'child_process';

const MP4 = 'mp4';

// While the gif file is not video
// some users try to utilize it as such
const videoExt = [MP4, 'webm', 'ogg', 'mov', 'avi', 'gif'];

const DEFAULT_MAX_FILE_SIZE = 2 * 1024 * 1024;
const DEFAULT_MAX_FILE_SIZE_IN_MB = DEFAULT_MAX_FILE_SIZE / 1024 / 1024;

const VIDEO_MAX_FILE_SIZE = 6 * 1024 * 1024;
const VIDEO_MAX_FILE_SIZE_IN_MB = VIDEO_MAX_FILE_SIZE / 1024 / 1024;

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

  const ext = split[1].toLowerCase();
  const isVideo = videoExt.includes(ext);

  if (isVideo) {
    if (ext.toLowerCase() !== MP4) {
      console.error(`👹 Oops! The mp4 file format is preferred over ${ext}.`);
      process.exit(1);
    }

    if (bytesSize > VIDEO_MAX_FILE_SIZE) {
      console.error(
        `👹 Oops! The file ${file} is too large. The maximum allowed size for video assets is ${VIDEO_MAX_FILE_SIZE_IN_MB} MB but got ${bytesSize}. Check the README.md for video content instructions, please.`,
      );

      console.log(
        '💡 For lenghty video content is much preferred to upload to a proper video streaming service, such as YouTube due to large file size. Please consider uploading to YouTube and using the video source-code snippet.',
      );

      process.exit(1);
    }
  }

  if (!isVideo && bytesSize > DEFAULT_MAX_FILE_SIZE) {
    console.error(
      `👹 Oops! The file ${file} is too large. The maximum allowed size is ${DEFAULT_MAX_FILE_SIZE_IN_MB} MB.`,
    );

    process.exit(1);
  }
});
