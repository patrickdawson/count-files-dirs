"use strict";

const klaw = require("klaw");
const klawSync = require("klaw-sync");

/**
 * Counts files and directories in the given directory.
 *
 * @param {string} dir - Directory to scan.
 * @param {Function} cb - Callback that is called with result (result contains fileCount
 *                        and dirCount properties).
 */
const countAsync = (dir, cb) => {
  const result = {
    fileCount: 0,
    dirCount: 0,
  };

  klaw(dir)
    .on("data", (item) => {
      if (item.stats.isDirectory()) {
        result.dirCount += 1;
      } else {
        result.fileCount += 1
      }
    })
    .on("end", () => {
      // Remove own directory
      result.dirCount -= 1;
      cb(result);
    });

  return result;
};

/**
 * Counts files and directories in the given directory.
 *
 * @param {string} dir - Directory to scan.
 * @returns {{fileCount: number, dirCount: number}}
 */
const countSync = (dir) => {
  const result = {
    fileCount: 0,
    dirCount: 0,
  };

  result.fileCount = klawSync(dir, { nodir: true }).length;
  result.dirCount = klawSync(dir, { nofile: true }).length;

  return result;
};

module.exports = {
  countAsync,
  countSync,
};

/*
walker.on("end", () => {
  console.log("Finished:");
  console.log("---------");
  console.log(`Total files: ${result.fileCount}`);
  console.log(`Total directories: ${result.dirCount}`);
});
*/
