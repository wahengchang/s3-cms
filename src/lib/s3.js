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

const listFileAll = (params, out = []) => new Promise((resolve, reject) => {
  s3.listObjectsV2(params).promise()
    .then(({Contents, IsTruncated, NextContinuationToken}) => {
      out.push(...Contents);
      !IsTruncated ? resolve(out) : resolve(listFileAll(Object.assign(params, {ContinuationToken: NextContinuationToken}), out));
    })
    .catch(reject);
});


const listFile = async (filePath) => {
  const Bucket = process.env.S3_BUCKET_NAME
  const params = {
    Bucket,
    Prefix: filePath || ''
  };

  try {
    const objList = await listFileAll(params)
    for(let i=0; i< objList.length; i++){
      const Key = objList[i].Key
      objList[i].imgUrl = `/img/${encodeURIComponent(Key)}`
    }
    
    return objList
  }
  catch(err){
    console.log(err)
    throw err
  }
}

module.exports = {getFile, listFile}