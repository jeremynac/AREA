FROM node:13-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g nodemon
RUN npm install

COPY .env ./
COPY src ./src

RUN ls -t

EXPOSE 28000

CMD ["nodemon", "src/server.js"]