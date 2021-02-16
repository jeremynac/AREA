
FROM node:14-alpine

WORKDIR /my-app

COPY package.json ./package.json

RUN npm install

EXPOSE 3000

COPY . .

CMD ["npm", "start"]