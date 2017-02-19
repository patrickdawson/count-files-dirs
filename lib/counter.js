const walk = require("walk");

/**
 * Counts files and directories in the given directory.
 *
 * @param {string} dir - Directory to scan.
 * @param {Function} cb - Callback that is called with result (result contains fileCount
 *                        and dirCount properties).
 */
const counter = function counter(dir, cb) {
  const result = {
    fileCount: 0,
    dirCount: 0,
  };

  const walker = walk.walk(dir, { followingSymlinks: false });

  walker.on("file", (root, stats, next) => {
    result.fileCount += 1;
    next();
  });

  walker.on("directory", (root, dirStatsArray, next) => {
    result.dirCount += 1;
    next();
  });

  walker.on("end", () => {
    cb(result);
  });

  return result;
};

module.exports = counter;

/*
walker.on("end", () => {
  console.log("Finished:");
  console.log("---------");
  console.log(`Total files: ${result.fileCount}`);
  console.log(`Total directories: ${result.dirCount}`);
});
*/
