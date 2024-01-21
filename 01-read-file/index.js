const fs = require('fs');
const path = require('path');
const readStream = fs.createReadStream(
  path.resolve(__dirname, 'text.txt'),
  'utf-8',
);
readStream.on('data', (data) => console.log(data));
readStream.on('error', (error) => console.log('Error: ' + error.message));
