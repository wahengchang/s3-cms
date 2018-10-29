(async function(){
  const express = require('express')
  const pug = require('pug');
  const app = express()
  const S3 = require('./lib/s3')
  const codePipeline = require('./lib/codepipeling')
  const SCREENSHOOT_PREFIX ='screenshoot_'

  function getFormattedDate(today) {
    if(!today) return ''
    // var week = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
    // var day  = week[today.getDay()];
    var dd   = today.getDate();
    var mm   = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    var hour = today.getHours();
    var minu = today.getMinutes();

    if(dd<10)  { dd='0'+dd } 
    if(mm<10)  { mm='0'+mm } 
    if(minu<10){ minu='0'+minu } 

    return dd+'/'+mm+'/'+yyyy+' '+hour+':'+minu;
    // return day+' - '+dd+'/'+mm+'/'+yyyy+' '+hour+':'+minu;
  }


  app.get('/pipelines', async (req, res) => {
    const {pipelines} = await codePipeline.list('/')

    const listResult = await Promise.all(
      pipelines.map(async ({name}) => {
        const result = await codePipeline.getByName(name)
        
        const statusList = result.stageStates.map(item => {
          const {stageName, latestExecution, actionStates} = item
          const status = latestExecution && latestExecution.status || 'unknow'
          const lastStatusChange = getFormattedDate(
            actionStates.slice(-1)[0] &&
            actionStates.slice(-1)[0].latestExecution &&
            actionStates.slice(-1)[0].latestExecution.lastStatusChange
          )
          
          return {stageName, status, lastStatusChange }
        })

        return {name, statusList}
      })
    )

    const compiledFunction = pug.compileFile('./src/listPipelineTemplate.pug');
    res.send(compiledFunction({
      title: 'Pipeline Status Report',
      listResult
    }))
  })

  app.get('/', async (req, res) => {
    try {
      const allFileInBucket = await S3.listFile()

      const htmlFileList = allFileInBucket.Contents
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


  const publicUrl = (Key) => {
    return `https://s3-ap-${process.env.S3_REGION}.amazonaws.com/${process.env.S3_BUCKET_NAME}/${Key}`
  }

  const getImageList = (fileListInBucket) => {
    return fileListInBucket
    .filter(item => item.Key.split('.').slice(-1)[0] === 'png')
    .map(item => {
      return {
        title: item.Key.split('/').slice(-1)[0],
        url: publicUrl(item.Key)
      }
    })
  }

  app.get('/images/:timeId', async (req, res) => {
    try {
      const {timeId} = req.params

      if(!timeId) throw new Error('timeId is required.')

      const allFileInBucket = await S3.listFile(`${timeId}/`)

      const pngFileList = getImageList(allFileInBucket.Contents)
      .filter(item => !item.url.includes(SCREENSHOOT_PREFIX))

      const compiledFunction = pug.compileFile('./src/imagesListTemplate.pug');

      return res.send(compiledFunction({
        title: 'E2E Test Report: Failures',
        pngFileList
      }))
    }
    catch(err){
      return res.send(err)
    }
  })

  app.get('/screenshoots/:timeId', async (req, res) => {
    try {
      const {timeId} = req.params

      if(!timeId) throw new Error('timeId is required.')

      const allFileInBucket = await S3.listFile(`${timeId}/`)

      const pngFileList = getImageList(allFileInBucket.Contents)
      .filter(item => item.url.includes(SCREENSHOOT_PREFIX))

      const compiledFunction = pug.compileFile('./src/screenshootsListTemplate.pug');

      return res.send(compiledFunction({
        title: 'E2E Test Report: Screenshoot',
        pngFileList
      }))
    }
    catch(err){
      return res.send(err)
    }
  })

  app.use(express.static('public'))

  const port = 3000
  app.listen(port, async () => {
    console.log(`Example app listening on port ${port}! http://localhost:${port}`)
  })  
})()