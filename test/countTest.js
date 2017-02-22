const chai = require("chai");
const mockfs = require("mock-fs");

const expect = chai.expect;

describe("count", function () {
  let countAsync;
  let countSync;

  before(function () {
    countAsync = require("../lib/counter").countAsync;
    countSync = require("../lib/counter").countSync;
  });

  beforeEach(function () {

  });

  afterEach(function () {
    mockfs.restore();
  });

  describe("sync", function () {
    it("returns count of 0 when there are no files found", function () {
      mockfs({
        data: {},
      });

      const result = countSync("data");
      expect(result.fileCount).to.equal(0);
    });

    it("returns count of 0 dirs when there are no dirs found", function () {
      mockfs({
        data: {},
      });

      const result = countSync("data");
      expect(result.dirCount).to.equal(0);
    });

    it("returns count of files found in a given directory", function () {
      mockfs({
        data: {
          file1: "file1",
          file2: "file2",
        },
      });

      const result = countSync("data");
      expect(result.fileCount).to.equal(2);
    });

    it("returns count of directores found in a given directory", function () {
      mockfs({
        data: {
          file1: "file1",
          file2: "file2",
          dir1: {},
        },
      });

      const result = countSync("data");
      expect(result.dirCount).to.equal(1);
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

      it("returns count of files found in a given directory", function () {
        const result = countSync("data");
        expect(result.fileCount).to.equal(5);
      });

      it("returns count of directores found in a given directory", function () {
        const result = countSync("data");
        expect(result.dirCount).to.equal(2);
      });
    });
  });

  describe("async", function () {
    describe("flat", function () {
      it("returns count of 0 files when there are no files found", function (done) {
        mockfs({
          data: {},
        });

        countAsync("data", (result) => {
          expect(result.fileCount).to.equal(0);
          done();
        });
      });

      it("returns count of 0 dirs when there are no dirs found", function (done) {
        mockfs({
          data: {},
        });

        countAsync("data", (result) => {
          expect(result.dirCount).to.equal(0);
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

        countAsync("data", (result) => {
          expect(result.fileCount).to.equal(2);
          done();
        });
      });

      it("returns count of directores found in a given directory", function (done) {
        mockfs({
          data: {
            file1: "file1",
            file2: "file2",
            dir: {},
          },
        });

        countAsync("data", (result) => {
          expect(result.dirCount).to.equal(1);
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
        countAsync("data", (result) => {
          expect(result.fileCount).to.equal(5);
          done();
        });
      });

      it("returns count of directores found in a given directory", function (done) {
        countAsync("data", (result) => {
          expect(result.dirCount).to.equal(2);
          done();
        });
      });
    });

  });
});
