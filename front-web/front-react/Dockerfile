FROM node:14-alpine

WORKDIR /front-react

COPY package.json ./package.json

RUN npm install

EXPOSE 3000

COPY . .

CMD ["npm", "start"]