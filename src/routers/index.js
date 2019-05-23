const express = require('express')
const router = express.Router()
const S3 = require('../lib/s3')
const pug = require('pug');

router.get('/', async function (req, res) {
  try {
    const allFileInBucket = await S3.listFile()
    const htmlFileList = allFileInBucket
    .filter(item => {
      return item.Key.split('.').slice(-1)[0] === 'html'
    })
    .filter(item => item.Key.split('/').length === 2)
    .map(item => item.Key.split("/")[0])

    const compiledFunction = pug.compileFile('./src/listTemplate.pug');
    return res.send(compiledFunction({
      title: 'E2E Test Report',
      nameList: htmlFileList
    }))
  }
  catch(err){
    return res.send(err)
  }
})

module.exports = router