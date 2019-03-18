const AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: process.env.AWS_KEY_ID,
    secretAccessKey: process.env.AWS_KEY_SECRET,
    region: 'ap-southeast-1'
})

var s3 = new AWS.S3();

const getFile = (filePath) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: filePath
  };

  return s3.getObject(params).promise()
}

const listFile = async (filePath) => {
  const Bucket = process.env.S3_BUCKET_NAME

  const params = {
    Bucket,
    Prefix: filePath || ''
  };

  const objList =  (await s3.listObjectsV2(params).promise()).Contents

  for(let i=0; i< objList.length; i++){
    const Key = objList[i].Key
    objList[i].imgUrl = `/img/${encodeURIComponent(Key)}`
  }
  
  return objList
}

module.exports = {getFile, listFile}