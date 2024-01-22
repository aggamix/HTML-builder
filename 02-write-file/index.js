const fs = require('fs');
const path = require('path');
const { stdin, stdout } = require('process');

const writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdout.write('Hi, write your text...\n');
stdin.on('data', (data) => {
  const text = data.toString();
  if (text.trim() === 'exit') {
    console.log('Thx, Have a good day!');
    process.exit();
  }
  writeStream.write(text);
});

process.on('SIGINT', () => {
  stdout.write('Thx, Have a good day!\n');
  process.exit();
});
