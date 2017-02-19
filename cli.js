#!/usr/bin/env node

const program = require("commander");
const counter = require(".");
const pkg = require("./package.json");

program
  .version(pkg.version)
  .usage("Usage: count-files [options] directory")
  .parse(process.argv);

if (program.args.length !== 1) {
  console.log(program.usage());
  process.exit(-1);
}

console.log(`Scanning directory ${program.args}`);
counter(program.args[0], result => {
  console.log("Finished:");
  console.log("---------");
  console.log(`Total files: ${result.fileCount}`);
  console.log(`Total directories: ${result.dirCount}`);
});
