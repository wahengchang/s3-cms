
const S3 = require('../lib/s3')

module.exports = async function (req, res) {
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
}