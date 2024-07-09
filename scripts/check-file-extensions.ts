#!/usr/bin/env bun

import { execSync } from 'child_process';

const prohibitedFileExt = [
  'gif',
  'exe',
  'bat',
  'mov',
  'avi',
  'zip',
  'rar',
  'tar',
  'gz',
  '7z',
  'iso',
  'dmg',
  'jar',
  'dll',
  'so',
  'pyc',
  'class',
  'swf',
  'fla',
  'flv',
  'psd',
  'ai',
  'indd',
  'doc',
  'docx',
  'xls',
  'xlsx',
  'ppt',
  'pptx',
  'pdf',
  'torrent',
];

const diff = execSync('git diff --cached --name-only');
const files = diff.toString().split('\n');

files.forEach((file) => {
  if (!file) return;

  const split = file.split('.');

  if (!split.length) return;

  const ext = split[0].toLowerCase();

  if (prohibitedFileExt.includes(ext)) {
    console.error(`👹 Oops! The file ${file} extension ${ext} is not allowed!`);

    process.exit(1);
  }
});
