const AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: process.env.AWS_KEY_ID,
    secretAccessKey: process.env.AWS_KEY_SECRET

var s3 = new AWS.S3();

const getFile = (filePath) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: filePath
  };

  return s3.getObject(params).promise()
}

const listFile = (filePath) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    // Key: filePath
  };

  return s3.listObjectsV2(params).promise()
}

module.exports = {getFile, listFile}