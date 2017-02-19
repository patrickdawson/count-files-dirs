const chai = require("chai");
const mockfs = require("mock-fs");

const expect = chai.expect;

describe("count", function () {
  let counter;

  before(function () {
    counter = require("../lib/counter");
  });

  beforeEach(function () {

  });

  afterEach(function () {
    mockfs.restore();
  });

  describe("flat", function () {
    it("returns count of 0 files when there are no files found", function (done) {
      mockfs({
        data: {},
      });

      counter("data", (result) => {
        expect(result.fileCount).to.equal(0);
        done();
      });
    });

    it("returns count of files found in a given directory", function (done) {
      mockfs({
        data: {
          file1: "file1",
          file2: "file2",
        },
      });

      counter("data", (result) => {
        expect(result.fileCount).to.equal(2);
        done();
      });
    });

    it("returns count of directores found in a given directory", function (done) {
      mockfs({
        data: {
          file1: "file1",
          file2: "file2",
        },
      });

      counter("data", (result) => {
        expect(result.dirCount).to.equal(0);
        done();
      });
    });
  });

  describe("with nested directories and files", function () {
    beforeEach(function () {
      mockfs({
        data: {
          file1: "file1",
          file2: "file2",
          subdir1: {
            ".hidden": "",
            "file3.txt": "",
            subdir2: {
              "foo.js": "",
            },
          },
        },
      });
    });

    it("returns count of files found in a given directory", function (done) {
      counter("data", (result) => {
        expect(result.fileCount).to.equal(5);
        done();
      });
    });

    it("returns count of directores found in a given directory", function (done) {
      counter("data", (result) => {
        expect(result.dirCount).to.equal(2);
        done();
      });
    });
  });

});
