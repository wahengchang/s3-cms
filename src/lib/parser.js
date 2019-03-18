
const publicUrl = (Key) => {
  return `https://s3-ap-${process.env.S3_REGION}.amazonaws.com/${process.env.S3_BUCKET_NAME}/${Key}`
}

const getImageList = (fileListInBucket) => {
  return fileListInBucket
  .filter(item => item.Key.split('.').slice(-1)[0] === 'png')
  .map(item => {
    return {
      title: item.Key.split('/').slice(-1)[0],
      imgUrl: item.imgUrl,
      url: publicUrl(item.Key)
    }
  })
}

module.exports ={
  getImageList
}