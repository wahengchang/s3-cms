set -e
`aws ecr get-login --no-include-email`
# npm version patch
PKG_VERSION=`sh script/getPackageVersion.sh`
PKG_NAME=`sh script/getPackageName.sh`
echo '1 -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-='
docker build -t $PKG_NAME:$PKG_VERSION . 
docker build -t $PKG_NAME:latest . 

echo '2 -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-='
docker tag $PKG_NAME:$PKG_VERSION $ECR_URL:$PKG_VERSION
docker tag $PKG_NAME:latest $ECR_URL:latest

echo '3 -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-='
docker push $ECR_URL:$PKG_VERSION

echo '4 -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-='
docker push $ECR_URL:latest

echo '5 -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-='
aws ecs  update-service --force-new-deployment --cluster $CLUSTER_NAME --service $SERVICE_NAME
