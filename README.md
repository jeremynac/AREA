# AREA

This project is an automation platform, that consists of a webapp, a mobile app and a server.

# Description

You can log in to external services and make scripts that will be triggered when an email is received, a message was sent by someone...

The services available are:
- Google (Gmail, Youtube)
- Facebook
- Twitch
- Trello
- Github
- Discord
- Deepapi

# Installation

- web-client:<br/>
``` docker-compose up --build client_web```
- mobile_client:<br/>
```docker-compsoe up --build client_mobile```
- server: <br/>
```docker-compose up --build server mongo mongo-seed```

# Tech used

Web-client:
- React
- Material-ui
- Axios

Mobile-client:
- Flutter

Server:
- Express.js/Node.js
- Mongodb
- Passport.js

# Documentation
You can find our documentation in:
- [Docs server](./docs/back)
- [Docs mobile app](./docs/front_mobile)
