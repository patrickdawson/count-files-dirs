#!/usr/bin/env node

"use strict";

const program = require("commander");
const counter = require(".");
const pkg = require("./package.json");

program
  .version(pkg.version)
  .option("-s, --use-sync", "Uses sync method to count")
  .usage("Usage: count-files [options] directory")
  .parse(process.argv);

if (program.args.length !== 1) {
  console.log(program.usage());
  process.exit(-1);
}

if (program.useSync) {
  const result = counter.countSync(program.args[0]);
  console.log("Count sync finished:");
  console.log("---------");
  console.log(`Total files: ${result.fileCount}`);
  console.log(`Total directories: ${result.dirCount}`);
} else {
  console.log(`Scanning directory ${program.args}`);
  counter.countAsync(program.args[0], result => {
    console.log("Count finished:");
    console.log("---------");
    console.log(`Total files: ${result.fileCount}`);
    console.log(`Total directories: ${result.dirCount}`);
  });
}


