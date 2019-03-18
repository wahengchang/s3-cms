(async function(){
  const express = require('express')
  const pug = require('pug');
  const app = express()
  const S3 = require('./lib/s3')
  const SCREENSHOOT_PREFIX ='screenshoot_'

  // screenshots of a time
  app.use('/screenshoots', require('./routers/screenshoots') )

  app.use('/pipelines', require('./routers/pipelines'))

  app.use('/images', require('./routers/images'))

  app.use('/img', require('./routers/img'))

  // reports is special, not router , but middleware
  app.get('/:timeId', require('./routers/reports'))

  app.use('/', require('./routers/index'))

  app.use(express.static('public'))

  const port = 3000
  app.listen(port, async () => {
    console.log(`Example app listening on port ${port}! http://localhost:${port}`)
  })  
})()