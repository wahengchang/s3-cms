const express = require('express')
const router = express.Router()
const pug = require('pug');
const S3 = require('../lib/s3')
const {SCREENSHOOT_PREFIX} = require('../const')
const {getImageList}  = require('../lib/parser')

router.get('/:timeId', async (req, res) => {
  try {
    const {timeId} = req.params

    if(!timeId) throw new Error('timeId is required.')

    const allFileInBucket = await S3.listFile(`${timeId}/`)

    const pngFileList = getImageList(allFileInBucket)
    .filter(item => !item.url.includes(SCREENSHOOT_PREFIX))

    const compiledFunction = pug.compileFile('./src/imagesListTemplate.pug');

    console.log('pngFileList: ', pngFileList)

    return res.send(compiledFunction({
      title: 'E2E Test Report: Failures',
      pngFileList
    }))
  }
  catch(err){
    console.log(err)
    return res.send(err)
  }
})

module.exports = router