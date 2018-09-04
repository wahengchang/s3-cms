# S3-cms

## Set up `env.sh`

```
echo "set AWS_KEY_ID"
export AWS_KEY_ID="yourAwsKey"
echo "set AWS_KEY_SECRET"
export AWS_KEY_SECRET="yourSecret"

echo "set S3_BUCKET_NAME"
export S3_BUCKET_NAME="yourBucketName"

```

## Run
```
$ source env.sh
$ npm run dev
```