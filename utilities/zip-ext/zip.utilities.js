const zip = new require('node-zip')()
const { forEach } = require('ramda/src')

exports.generateZip = (nameZip, filesToUpload) => {
  forEach(({ fileName, fileContent }) => {
    zip.file(`${fileName}`, fileContent)
  })(filesToUpload)

  return {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename=${nameZip}.zip`,
    },
    body: zip.generate({ base64: true, compression: 'DEFLATE' }),
    statusCode: 200,
  }
}
