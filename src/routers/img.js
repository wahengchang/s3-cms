const express = require('express')
const router = express.Router()
const S3 = require('../lib/s3')

router.get('/:timeId', async (req, res) => {
  const {timeId} = req.params
  const binaryFile = (await S3.getFile(timeId)).Body

  res.writeHead(200, {'Content-Type': 'image/png' });
  res.end(binaryFile, 'binary');
})

module.exports = router