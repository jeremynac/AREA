const express = require('express')
const passport = require('passport')
const User = require('../schema/schemaUser')
const Scripts = require('../schema/schemaScript')
const Services = require('../schema/schemaService')

function auth(req, res, next) {
    console.log("try")
    console.log(req.user)
    console.log(req.session)
    if (req.isAuthenticated()) {
        next()
    } else {
        return res.status(401).json({ error: 'not connected' })
    }
}

module.exports = function(app) {
    app.get('/logout', auth, (req, res) => {
        try {
            console.log("logging out")
            req.logout();
            console.log("logged out")
            return res.status(200).json("logged out")
        } catch (e) {
            console.log(e)
            return res.status(400).json({ errors: err })
        }
    })
    app.post('/login', (req, res, next) => {
        passport.authenticate('local-signin', (err, user, info) => {
            if (err) {
                console.log("err")
                return res.status(400).json({ errors: err })
            } else if (!user) {
                console.log("no user", err, info)
                return res.status(401).json({ errors: "wrong pass" })
            } else {
                req.logIn(user, function(err) {
                    console.log("err", user)
                })
                console.log("logged in", user)
                return res.status(200).json({ userID: user.id, firstname: user.firstname, lastname: user.lastname, teacher: user.teacher });
            }
        })(req, res, next)
    })

    app.post('/register', (req, res, next) => {
        passport.authenticate('local-sign_up', (err, user, info) => {
            if (err) {
                console.log("err")
                return res.status(400).json({ errors: err })
            } else if (!user) {
                console.log("no user")
                return res.status(401).json({ errors: info })
            } else {
                req.logIn(user, function(err) {
                    console.log("err", user)
                })
                console.log("signing up", user)
                return res.status(200).json({ success: user.id });
            }
        })(req, res, next)
    })

    app.get('/isauth', async function(req, res) {
        if (req.isAuthenticated()) {
            return res.status(200).json({ connected: true })
        } else {
            return res.status(200).json({ connected: false })
        }
    })

    app.post('/update', auth, async function(req, res) {
        let user = await User.findById(req.user.id);
        user.firstname = req.body.firstname
        user.lastname = req.body.lastname
        user.username = req.body.username
        user.save().then(() => {
                return res.status(200).json({ ok: true })
            })
            .catch(err => {
                console.log("/update test: ", err);
                return res.status(500).json({ ok: true });
            })
    })

    app.post('/password/update', auth, async function(req, res) {
        let user = await User.findById(req.user.id);
        user.password = req.body.password;
        user.save().then(() => {
                return res.status(200).json({ ok: true })
            })
            .catch(err => {
                return res.status(500).json({ ok: true })
            })
    })
    app.get('/scripts', auth, async function(req, res) {
        try {
            let scripts = await User.findById(req.user.id).select("-_id scripts").populate("scripts", "name img");
            return res.status(200).json({ scripts: scripts })
        } catch (e) {
            return res.status(500).json({ error: e })
        }

    })
}