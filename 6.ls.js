const fs = require('node:fs/promises')

fs.readdir('./')
  .then((files) => {
    files.forEach((file) => {
      console.log(file)
    })
  })
  .catch((error) => {
    console.error('Error reading folder:', error)
  })
