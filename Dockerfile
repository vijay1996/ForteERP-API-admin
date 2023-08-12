FROM node:alpine
WORKDIR /dist
COPY package.json ./
COPY package-lock.json ./
COPY .env ./
COPY dist ./
CMD npm install --production && npm run prod