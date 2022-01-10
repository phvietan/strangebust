/* eslint-disable require-jsdoc */

const fs = require('fs');
const mPackage = require('./package.json');
const mPackageLock = require('./package-lock.json');

function incVersion(v) {
  const s = v.split('.');
  const p = s.length - 1;
  s[p] = (parseInt(s[p], 10) + 1).toString();
  return s.join('.');
}

mPackage.version = incVersion(mPackage.version);
mPackageLock.version = incVersion(mPackageLock.version);

fs.writeFileSync('package.json', JSON.stringify(mPackage, null, '  '));
fs.writeFileSync('package-lock.json', JSON.stringify(mPackageLock, null, '  '));
