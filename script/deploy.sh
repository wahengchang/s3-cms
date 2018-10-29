set -e
npm version patch
PKG_VERSION=`sh script/getPackageVersion.sh`
docker build -t rrc-backstage-screenshoot-report:$PKG_VERSION . 
docker build -t rrc-backstage-screenshoot-report:latest . 
docker tag rrc-backstage-screenshoot-report:$PKG_VERSION 354821401994.dkr.ecr.ap-southeast-1.amazonaws.com/rrc-backstage-screenshoot-report:$PKG_VERSION
docker tag rrc-backstage-screenshoot-report:latest 354821401994.dkr.ecr.ap-southeast-1.amazonaws.com/rrc-backstage-screenshoot-report:latest
docker push 354821401994.dkr.ecr.ap-southeast-1.amazonaws.com/rrc-backstage-screenshoot-report:$PKG_VERSION
docker push 354821401994.dkr.ecr.ap-southeast-1.amazonaws.com/rrc-backstage-screenshoot-report:latest