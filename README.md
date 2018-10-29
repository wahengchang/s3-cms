


## Building Docker image
```
$  docker build -t s3-cms .

```

## Running Docker
```
$ docker run -p 80:3000 -d --env AWS_KEY_ID=$AWS_KEY_ID --env AWS_KEY_SECRET=$AWS_KEY_SECRET --env S3_BUCKET_NAME=$S3_BUCKET_NAME --env S3_REGION=$S3_REGION {image-id}

```