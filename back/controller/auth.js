const express = require('express')
const passport = require('passport')
const User = require('@schemas/schemaUser')
const Scripts = require('@schemas/schemaScript')
const Services = require('@schemas/schemaService')

module.exports = function(app) {
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

    app.get('/isauth', async(req, res) => {
        if (req.isAuthenticated()) {
            return res.status(200).json({ connected: true })
        } else {
            return res.status(200).json({ connected: false })
        }
    })
    app.get('/fb-login', async(req, res, next) => {
        passport.authenticate('facebook', (err, user, info) => {
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
    app.post('/facebook/callback', async(req, res, next) => {
        passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' });
    })

    app.get('/go-login', async(req, res, next) => {
        passport.authenticate('google', {
            scope: ['email', 'profile']
        }, (err, user, info) => {
            if (err) {
                console.log("err", err)
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

    app.get('/google/callback', async(req, res, next) => {
        passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login' })
    })

}