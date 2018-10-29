


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

### Remark
getting $ECR_URL

![image](https://user-images.githubusercontent.com/5538753/47828907-dcefdf80-ddbf-11e8-98f2-6263dc112e32.png)

getting $CLUSTER_NAME
![image](https://user-images.githubusercontent.com/5538753/47828760-60f59780-ddbf-11e8-9418-23c16a2aed25.png)


getting $SERVICE_NAME
![image](https://user-images.githubusercontent.com/5538753/47828931-fa24ae00-ddbf-11e8-985e-8b0d2f898145.png)



## Referrence 
 - [https://medium.freecodecamp.org/how-to-deploy-a-node-js-application-to-amazon-web-services-using-docker-81c2a2d7225b](https://medium.freecodecamp.org/how-to-deploy-a-node-js-application-to-amazon-web-services-using-docker-81c2a2d7225b)