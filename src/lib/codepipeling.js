const AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: process.env.AWS_KEY_ID,
    secretAccessKey: process.env.AWS_KEY_SECRET,
    region: 'ap-southeast-1'
})

var codePipeline = new AWS.CodePipeline();

const list = () => {
  return codePipeline.listPipelines().promise()
}

const getByName = (name) => {
  const param = {name}
  return codePipeline.getPipelineState(param).promise()
}

module.exports = {list, getByName}