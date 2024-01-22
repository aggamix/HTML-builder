const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const pathStyleFolder = path.join(__dirname, 'styles');
const pathBundleFile = path.join(__dirname, 'project-dist', 'bundle.css');

async function createBundleFile() {
  try {
    const files = await readDir(pathStyleFolder);
    const styleFile = await getStyleFile(files);
    const writeStream = fs.createWriteStream(pathBundleFile);
    for (const file of styleFile) {
      await readWriteData(file, writeStream);
    }
    writeStream.end();
  } catch (error) {
    throwError(error);
    return;
  }
}

async function readDir(path) {
  return await fsPromises.readdir(path, {
    withFileTypes: true,
  });
}

async function getStyleFile(arr) {
  return arr
    .filter((file) => file.isFile())
    .filter((file) => path.extname(file.name) === '.css');
}

async function readWriteData(item, stream) {
  const pathFile = path.join(pathStyleFolder, item.name);
  const data = await fsPromises.readFile(pathFile);
  stream.write(data + '\n');
}

async function throwError(e) {
  console.log('Error: ' + e.message);
  throw e;
}

createBundleFile();
