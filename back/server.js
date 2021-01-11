//Définition des modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const process = require('process');
const app = express();
const passport = require("./controller/auth_passport");
const cors = require("cors")
    // const session = require('session')


// CONNECT TO DB

app.use(bodyParser.urlencoded({ extended: true }))
    //app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// Init REST API

app.use(
    cors({
        origin: "http://localhost:3000", // allow to server to accept request from different origin
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true, // allow session cookie from browser to pass through
    })
);

app.set('trust proxy', true)
    // Penser à enlever sameSite et secure atribute quand on passera en prod
app.use(require('express-session')({
    secret: 'derpy',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000 //1 hour
    }
}));

app.use(passport.initialize());
app.use(passport.session()); // Required for persistent login sessions (optional, but recommended)
app.use(function(req, res, next) {
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );
    // res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

async function connectdb() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    mongoose
        .connect("mongodb://" + process.env.MONGO_USER + ":" + process.env.MONGO_PASSWORD + "@" + process.env.MONGO_HOST + "/" + process.env.MONGO_USER)
        .then(() => {
            console.log("Connected to mongoDB");
        })
        .catch((e) => {
            console.log("Error while DB connecting");
            console.log(e);
            connectdb();
        });
}

connectdb();

app.set('trust proxy', true)

app.use(express.urlencoded({ extended: true }));


// Controllers:

const routerUser = express.Router();
const routerQuestion = express.Router();
const routerAssignement = express.Router();
const routerAnswerSheet = express.Router();
const routerCourse = express.Router();

app.use("/user", routerUser);
require(__dirname + "/controller/user")(routerUser);

app.use((req, res, next) => {
    console.log("hello")
    if (req.isAuthenticated()) {
        console.log("yes")
        next()
    } else {
        console.log("no")
        return res.status(400).json({ error: "not authenticated" })
    }
})

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));