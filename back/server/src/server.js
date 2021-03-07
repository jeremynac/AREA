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
const schedule = require('node-schedule');
const { scheduleActivation } = require('@activation/schedule');
const User = require("@schemas/schemaUser");
const { getAbout } = require("@activation/about")
const path = require("path");

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieparser('stuff', { maxAge: 500, SameSite: false, secure: true, httpOnly: false }))

app.use(
    cors({
        origin: "http://localhost:8081",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
    })
);

app.set('trust proxy', true)
app.use(require('express-session')({
    secret: 'derpy',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000 //1 hour
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8081");

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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Controllers:

const routerUser = express.Router();
const routerScript = express.Router();
const routerAction = express.Router();
const routerReaction = express.Router();
const routerService = express.Router();
const routerAuth = express.Router();
const routerAdmin = express.Router();
const routerPublic = express.Router();

app.use("/auth", routerAuth);
require("@controller/auth")(routerAuth);

app.use('/public', routerPublic);
require('@controller/public')(routerPublic);

app.get('/about.json', async(req, res) => {
    let about = await getAbout(req)
    return res.status(200).json(about)
})

app.use(async(req, res, next) => {
    console.log("hello", req.headers)
    if (req.isAuthenticated()) {
        console.log("yes")
        next()
    } else if (req.headers.uid) {
        console.log("no, check header")
        req.session.user = req.headers.uid
        let user = await User.findById(req.headers.uid)
        if (user) {
            req.user = user
            next()
        }
    } else {
        console.log('no')
        return res.status(403).json({ error: "not authenticated" })
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

app.listen(process.env.PORT, () => {
    scheduleActivation('1h')
})

/*

set the schedule to:
 - '1h' : 1 per hour
 - '5min': 5 minutes
 - '1min': 1 minute
 - '30sec': 30 seconds
 - '5sec': 5seconds
 
*/