import fs from 'node:fs/promises';

console.log('Reading files...');

console.log('Reading file 1...');
const text = await fs.readFile('./file.txt', 'utf-8');
console.log('File 1:', text);

console.log('Doing some stuff...');

console.log('Reading file 2...');
const text2 = await fs.readFile('./file.txt', 'utf-8');
console.log('File 2:', text2);
