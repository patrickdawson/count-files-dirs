# count-files-dirs
This module provides an easy way to count files and directories in a given
subdirectory. It provides both async and sync versions.

## Examples
### Async
```javascript
countAsync("some_dir", (result) => {
  console.log(result.fileCount);
  console.log(result.dirCount);
});
```

### Sync
```javascript
const result = countSync("some_dir");
console.log(result.fileCount);
console.log(result.dirCount);
```