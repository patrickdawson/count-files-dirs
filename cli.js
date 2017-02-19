const program = require("commander");
const counter = require(".");

program
  .version("1.0.0")
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
