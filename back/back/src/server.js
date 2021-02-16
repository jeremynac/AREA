//Définition des modules
require('module-alias/register')
require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieparser = require('cookie-parser')
const process = require('process');
const app = express();
const passport = require("@user/auth_passport");
const cors = require("cors");
const { json } = require('body-parser');
// const session = require('session')


// CONNECT TO DB

app.use(bodyParser.urlencoded({ extended: true }))
    //app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieparser('stuff', { maxAge: 500, SameSite: false, secure: true, httpOnly: false }))



// Init REST API

app.use(
    cors({
        origin: "http://localhost:8080", // allow to server to accept request from different origin
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
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type,Accept, Authortization');
    // res.setHeader('Acces-Control-Allow-Methods','GET, POST, PATCH, DELETE');
    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");

    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type,Accept, Authortization');
    // res.setHeader('Acces-Control-Allow-Methods','GET, POST, PATCH, DELETE');
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
const routerScript = express.Router();
const routerAction = express.Router();
const routerReaction = express.Router();
const routerService = express.Router();
const routerAuth = express.Router();
const routerAdmin = express.Router();

app.use("/auth", routerAuth);
require("@controller/auth")(routerAuth);

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

app.use('/admin', routerAdmin);
require('@controller/admin')(routerAdmin);

app.use("/user", routerUser);
require("@controller/user")(routerUser);

app.use("/script", routerScript);
require("@controller/script")(routerScript);

app.use("/action", routerAction);
require("@controller/action")(routerAction);

app.use("/reaction", routerReaction);
require("@controller/reaction")(routerReaction);

app.use("/service", routerService);
require("@controller/service")(routerService);

app.use((req, res) => {
    try {} catch (e) {
        console.log(e)
        return res.status(401).json({ error: e })
    }
    return res.status(400).json({ value: 'nothing happened' })
})

app.listen(process.env.PORT) //process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));