FROM node:16-alpine3.11 AS build

RUN apk update && \
    apk add --no-cache tzdata

ENV TZ Europe/Vienna

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install 

COPY . .

RUN npm run build

CMD ["node", "dist/main"]