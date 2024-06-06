import fs from 'node:fs/promises';

Promise.all([
  fs.readFile('./file.txt', 'utf-8'),
  fs.readFile('./file.txt', 'utf-8'),
]).then(([text1, text2]) => {
  console.log('Reading files...');
  console.log('Reading file 1...');
  console.log('File 1:', text1);
  console.log('Doing some stuff...');
  console.log('Reading file 2...');
  console.log('File 2:', text2);
});
