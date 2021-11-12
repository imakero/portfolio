const fs = require('fs')
const https = require('https')
const sizeOf = require('image-size')

export const fileExists = (path) => {
  try {
    return fs.existsSync(path)
  } catch (error) {
    console.error(error)
  }
}

export const downloadFile = async (url, path) => {
  return new Promise((resolve, reject) => {
    const req = https.get(url, (res) => {
      const fileStream = fs.createWriteStream(path)
      res.pipe(fileStream)

      fileStream.on('error', (error) => {
        console.error('error')
        reject()
      })

      fileStream.on('finish', () => {
        fileStream.close()
        resolve()
      })
    })
  })
}

export const preprocessBlocks = async (blocks) => {
  return await Promise.all(blocks.map(preprocessBlock))
}

export const preprocessBlock = async (block) => {
  if (block.type === 'image') {
    const filePath = `./public/images/${block.id}.jpg`
    if (!fileExists) {
      await downloadFile(block.image.file.url, filePath)
    }
    const dimensions = sizeOf(filePath)
    return { ...block, dimensions }
  } else {
    return block
  }
}
