const express = require('express')
const passport = require('passport')
const User = require('@schemas/schemaUser')
const Scripts = require('@schemas/schemaScript')
const Services = require('@schemas/schemaService')
const axios = require('axios')

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
                    console.log("ok")
                })
                console.log("logged in", user.id)
                return res.status(200).json({ userID: user.id });
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
        passport.authenticate('facebook');
    })
    app.get('/facebook/callback', async(req, res, next) => {
        console.log('facebook callback', req.query)
        passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' });
    })

    app.get('/go-login/:user_id', async(req, res) => {
        // console.log(req.params.user_id);
        passport.authenticate('google', {
            scope: [
                'https://www.googleapis.com/auth/gmail.readonly',
                'email',
                'profile',
                "https://mail.google.com/",
                "https://www.googleapis.com/auth/gmail.modify",
                "https://www.googleapis.com/auth/gmail.compose",
                "https://www.googleapis.com/auth/gmail.send",
                "https://www.googleapis.com/auth/gmail.addons.current.action.compose"
            ],
            state: req.params.user_id
        })(req, res)
    })

    // app.get('/google/callback', async(req, res, next) => {
    //     console.log('google callback', req.query)
    //     passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login' })(req, res, next)
    // })

    // app.get('/google/callback', passport.authenticate('google', {
    //         scope: ['email', 'profile']
    //     }, { session: false }),
    //     function(req, res) {
    //         return res.status(200).json({
    //             ok: "OK"
    //         })
    //     }

    // )
    app.get('/google/callback', (req, res) => {
        passport.authenticate('google', (err, user, new_account, success) => {
            console.log('okok', new_account)
            try {
                if (err) {
                    console.log("err")
                    return res.status(400).json({ errors: err })
                } else if (!user) {
                    console.log("added account")
                    return res.status(200).json({ new_account: new_account.value, new_user: false })
                } else {
                    console.log("connected or added account", user)
                    console.log('okokok')
                    req.logIn(user, function(err) {
                        console.log(err)
                    })
                    console.log("err", user)
                    console.log("connected or added account", user)
                    return res.status(200).json({ new_account: new_account.value, new_user: true });
                }
            } catch (e) {
                console.log(e)
                return res.status(400).json({ errors: err })
            }
        })(req, res)
    })

    app.get('/tt-login', passport.authenticate('twitter'))

    // app.get('/google/callback', async(req, res, next) => {
    //     console.log('google callback', req.query)
    //     passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login' })(req, res, next)
    // })

    // app.get('/google/callback', passport.authenticate('google', {
    //         scope: ['email', 'profile']
    //     }, { session: false }),
    //     function(req, res) {
    //         return res.status(200).json({
    //             ok: "OK"
    //         })
    //     }

    // )
    app.get('/twitter/callback', (req, res) => {
        passport.authenticate('twitter', (err, user, new_account) => {
            console.log('okok', new_account)
            try {
                if (err) {
                    console.log("err")
                    return res.status(400).json({ errors: err })
                } else if (!user) {
                    console.log("added account")
                    return res.status(200).json({ new_account: new_account.value, new_user: false })
                } else {
                    console.log("connected or added account", user)
                    console.log('okokok')
                    req.logIn(user, function(err) {
                        console.log(err)
                    })
                    console.log("err", user)
                    console.log("connected or added account", user)
                    return res.status(200).json({ new_account: new_account.value, new_user: true });
                }
            } catch (e) {
                console.log(e)
                return res.status(400).json({ errors: err })
            }
        })(req, res)
    })

    app.get('/intra', async function(req, res) {
        // try {
        //     // console.log(response)
        // } catch (e) {
        //     console.log(e)
        // }
    })

    app.get('/off-login', passport.authenticate('office'))

    app.get('/office/callback', (req, res) => {
        console.log(req)
        passport.authenticate('office', (err, user, new_account) => {
            console.log('okok', err, new_account)
            try {
                if (err) {
                    console.log("err")
                    return res.status(400).json({ errors: err })
                } else if (!user) {
                    console.log("added account")
                    return res.status(200).json({ new_account: new_account.value, new_user: false })
                } else {
                    console.log("connected or added account", user)
                    console.log('okokok')
                    req.logIn(user, function(err) {
                        console.log(err)
                    })
                    console.log("err", user)
                    console.log("connected or added account", user)
                    return res.status(200).json({ new_account: new_account.value, new_user: true });
                }
            } catch (e) {
                console.log(e)
                return res.status(400).json({ errors: err })
            }
        })(req, res)
    })
    var scopes = ['identify', 'email', /* 'connections', (it is currently broken) */ 'guilds', 'guilds.join'];
    var prompt = 'consent'
    app.get('/di-login/:user_id', async(req, res) => {
        // console.log(req.params.user_id);
        console.log('test')
        passport.authenticate('discord', {
            scope: scopes,
            prompt: prompt,
            state: req.params.user_id
        })(req, res)
    })
    app.get('/discord/callback',
        passport.authenticate('discord', (req, res) => {
            console.log(req)
                // res.redirect('/secretstuff') // Successful auth
        })
    );
    const customDiStrategy = async(code) => {
        const clientID = process.env.DISCORD_CLIENT_ID
        const clientSecret = process.env.DICORD_CLIENT_SECRET
        data = {
            'client_id': process.env.DISCORD_CLIENT_ID,
            'client_secret': process.env.DISCORD_CLIENT_SECRET,
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': process.env.SERVER_URL + process.env.DISCORD_CALLBACK,
            'scope': 'identify email connections'
        }
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        try {
            axios.post('/oauth2/token', data, {
                headers: headers
            }).then(async function(response) {
                console.log(response.data)
            }).catch(error => {
                console.error(error);
            });
        } catch (e) {
            console.log(e)
        }
    }
}