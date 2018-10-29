FROM node:8-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
ENV AWS_KEY_ID $AWS_KEY_ID \
    AWS_KEY_SECRET $AWS_KEY_SECRET \
    S3_BUCKET_NAME $S3_BUCKET_NAME \
    S3_REGION $S3_REGION
RUN npm install; env
EXPOSE 3000
CMD [ "node", "src/app" ]