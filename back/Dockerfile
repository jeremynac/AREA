FROM node:13-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 28000

CMD ["node", "server.js"]