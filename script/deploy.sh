set -e
`aws ecr get-login --no-include-email`
npm version patch
PKG_VERSION=`sh script/getPackageVersion.sh`
PKG_NAME=`sh script/getPackageName.sh`
docker build -t $PKG_NAME:$PKG_VERSION . 
docker build -t $PKG_NAME:latest . 
docker tag $PKG_NAME:$PKG_VERSION $ECR_URL:$PKG_VERSION
docker tag $PKG_NAME:latest $ECR_URL:latest
docker push $ECR_URL:$PKG_VERSION
docker push $ECR_URL:latest