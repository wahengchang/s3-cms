const express = require('express')
const router = express.Router()
const codePipeline = require('../lib/codepipeling')
const pug = require('pug');
const {getFormattedDate} = require('../lib/date')

router.get('/', async (req, res) => {
  const {pipelines} = await codePipeline.list('/')

  const listResult = await Promise.all(
    pipelines.map(async ({name}) => {
      const result = await codePipeline.getByName(name)
      
      console.log(result)

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

module.exports = router