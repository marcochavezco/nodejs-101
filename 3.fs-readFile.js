const fs = require('node:fs')

console.log('Reading files...')

// Asynchronous version
console.log('Reading file 1...')
fs.readFile('./file.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  console.log('File 1:', data)
})

console.log('Doing some stuff...')

// Synchronous version
console.log('Reading file 2...')
const text2 = fs.readFileSync('./file2.txt', 'utf-8')
console.log('File 2:', text2)
