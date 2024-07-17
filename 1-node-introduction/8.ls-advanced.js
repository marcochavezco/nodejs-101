const fs = require('node:fs/promises')
const path = require('node:path')
const pc = require('picocolors')

const folder = process.argv[2] ?? './'

async function ls (folder) {
  let files
  try {
    files = await fs.readdir(folder)
  } catch (error) {
    console.error(pc.red(`Error reading folder: ${folder}`))
    process.exit(1)
  }

  const filesPromises = files.map(async (file) => {
    const filePath = path.join(folder, file)
    let stats
    try {
      stats = await fs.stat(filePath)
    } catch (error) {
      console.error(pc.red(`Error reading file: ${filePath}`))
      process.exit(1)
    }

    const isDirectory = stats.isDirectory()
    const filetype = isDirectory ? 'd' : '-'
    const filesize = stats.size
    const fileModified = stats.mtime.toLocaleString()

    return `${pc.bgBlue(filetype)} ${pc.cyan(file.padEnd(20))} ${pc.green(
      filesize.toString().padStart(20)
    )} ${pc.yellow(fileModified)}`
  })

  const filesInfo = await Promise.all(filesPromises)

  filesInfo.forEach((fileInfo) => {
    console.log(fileInfo)
  })
}

ls(folder)
