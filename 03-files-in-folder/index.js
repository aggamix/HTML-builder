const fs = require('fs');
const path = require('path');

const pathSecretFolder = path.join(__dirname, 'secret-folder');

fs.readdir(pathSecretFolder, { withFileTypes: true }, (error, files) => {
  if (error) throw error;

  const filesArr = files.filter((item) => item.isFile());

  filesArr.forEach((file) => {
    const pathFile = path.join(pathSecretFolder, file.name);
    const fileName = `${path.parse(pathFile).name}`;
    const fileExt = `${path.parse(pathFile).ext}`.slice(1);

    fs.stat(pathFile, (error, stats) => {
      if (error) throw error;
      const fileSize = `${stats.size / 1024}kb`;
      console.log(`${fileName} - ${fileExt} - ${fileSize}`);
    });
  });
});
