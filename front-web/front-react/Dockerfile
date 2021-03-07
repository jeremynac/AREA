FROM node:14-alpine

WORKDIR /app

COPY package.json ./package.json

RUN npm install

EXPOSE 8081

COPY . .

CMD ["npm", "start"]