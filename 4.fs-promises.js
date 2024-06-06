// const { promisify } = require('node:util');
// const readFilePromise = promisify(fs.readFile);

const fs = require('node:fs/promises');

console.log('Reading files...');

console.log('Reading file 1...');
fs.readFile('./file.txt', 'utf-8').then((data) => {
  console.log('File 1:', data);
});

console.log('Doing some stuff...');

console.log('Reading file 2...');
fs.readFile('./file.txt', 'utf-8').then((data) => {
  console.log('File 2:', data);
});
