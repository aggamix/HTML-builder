const fsPromises = require('fs/promises');
const path = require('path');

const pathInitFolder = path.join(__dirname, 'files');
const pathCopyFolder = path.join(__dirname, 'files-copy');

async function copyDir() {
  try {
    await fsPromises.mkdir(pathCopyFolder, { recursive: true });
    const files = await readDir(pathInitFolder);
    const copyFiles = await readDir(pathCopyFolder);
    const nameFile = await getNameFile(files);
    const copyNameFile = await getNameFile(copyFiles);
    for (const file of nameFile) {
      await copyFile(file);
    }
    for (const file of copyNameFile) {
      if (!nameFile.includes(file)) {
        await deleteFile(file);
      }
    }
  } catch (error) {
    throwError(error);
  }
}

async function readDir(path) {
  return await fsPromises.readdir(path, {
    withFileTypes: true,
  });
}

async function getNameFile(arr) {
  return arr.filter((item) => item.isFile()).map((item) => item.name);
}

async function copyFile(item) {
  try {
    await fsPromises.copyFile(
      path.join(pathInitFolder, item),
      path.join(pathCopyFolder, item),
    );
  } catch (error) {
    throwError(error);
    return;
  }
}

async function deleteFile(item) {
  try {
    await fsPromises.unlink(path.join(pathCopyFolder, item));
  } catch (error) {
    throwError(error);
    return;
  }
}

async function throwError(e) {
  console.log('Error: ' + e.message);
  throw e;
}

copyDir();
