(async function(){
  const express = require('express')
  const pug = require('pug');
  const app = express()
  const S3 = require('./lib/s3')
    
  app.get('/', async (req, res) => {
    try {
      const allFileInBucket = await S3.listFile()

      const htmlFileList = allFileInBucket.Contents
      .filter(item => item.Key.split('.').slice(-1)[0] === 'html')
      .filter(item => item.Key.split('/').length === 2)
      .map(item => item.Key.split("/")[0])

      const compiledFunction = pug.compileFile('./src/listTemplate.pug');

      // console.log('htmlFileList: ', htmlFileList)
      return res.send(compiledFunction({
        title: 'E2E Test Report',
        nameList: htmlFileList
      }))
    }
    catch(err){
      return res.send(err)
    }
  })

  app.get('/:timeId', async (req, res) => {
    try {
      const {timeId} = req.params

      if(!timeId) throw new Error('timeId is required.')

      const filePath = `${timeId}/mochawesome.html`
    
      const result = await S3.getFile(filePath)
      return res.send(result.Body.toString('utf8'))
    }
    catch(err){
      return res.send(err)
    }
  })

  app.use(express.static('public'))

  app.listen(8080, async () => {
    console.log('Example app listening on port 8080! http://localhost:8080')
  })  
})()