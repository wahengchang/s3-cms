


## Building Docker image
```
$  docker build -t s3-cms .

```

## Running Docker
```
$ docker run -p 80:3000 -d --env AWS_KEY_ID=$AWS_KEY_ID --env AWS_KEY_SECRET=$AWS_KEY_SECRET --env S3_BUCKET_NAME=$S3_BUCKET_NAME --env S3_REGION=$S3_REGION {image-id}

```


## Depoly
```
$ aws ecr get-login --no-include-email --region ap-$S3_REGION
$ docker login -u AWS -p xxxx
```


## Referrence 
 - [https://medium.freecodecamp.org/how-to-deploy-a-node-js-application-to-amazon-web-services-using-docker-81c2a2d7225b](https://medium.freecodecamp.org/how-to-deploy-a-node-js-application-to-amazon-web-services-using-docker-81c2a2d7225b)