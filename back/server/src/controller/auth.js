const express = require('express')
const passport = require('passport')
const User = require('@schemas/schemaUser')
const Scripts = require('@schemas/schemaScript')
const Services = require('@schemas/schemaService')
const axios = require('axios')
const { authCallback } = require('@account/account_functions')
const { trelloStrategy } = require('@account/auth_strategies/trello')

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
    app.get('/fb-login/:user_id', (req, res, next) => {
        // console.log('test', req.params.user_id)
        passport.authenticate('facebook', {
            state: req.params.user_id,
            scope: ['user_friends', 'user_likes', 'user_posts', 'public_profile', 'pages_show_list', 'pages_manage_metadata', 'pages_read_engagement', 'pages_manage_posts']
        })(req, res, next);
    })
    app.get('/facebook/callback', async(req, res, next) => {
        console.log('facebook callback', req.query)
        passport.authenticate('facebook', (err, user, new_account, success) => {
            console.log('okok', err, new_account)
            try {
                if (err) {
                    console.log("err")
                    return res.status(400).json({ errors: err })
                } else if (!user) {
                    console.log("added account")
                    return res.status(200).json({ new_account: new_account.value, new_user: false })
                } else {
                    req.logIn(user, function(err) {
                        console.log(err)
                    })
                    console.log("connected or added account", user)
                    return res.status(200).json({ new_account: new_account.value, new_user: true });
                }
            } catch (e) {
                console.log(e)
                return res.status(400).json({ errors: err })
            }
        })(req, res);
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
                "https://www.googleapis.com/auth/gmail.addons.current.action.compose",
                "https://www.googleapis.com/auth/youtube",
                "https://www.googleapis.com/auth/youtube.force-ssl"

            ],
            state: req.params.user_id,
            accessType: 'offline',
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
            console.log('okok', err, new_account)
            try {
                if (err) {
                    console.log("err")
                    return res.status(400).json({ errors: err })
                } else if (!user) {
                    console.log("added account")
                    return res.status(200).json({ new_account: new_account.value, new_user: false })
                } else {
                    req.logIn(user, function(err) {
                        console.log(err)
                    })
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

    app.get('/off-login/:user_id', async(req, res) => {
        passport.authenticate('office',
            //  {
            //     state: req.params.user_id
            // }
        )(req, res)
    })

    app.get('/office/callback', (req, res) => {
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
                    req.logIn(user, function(err) {
                        console.log(err)
                    })
                    console.log("connected or added account", user)
                    return res.status(200).json({ new_account: new_account.value, new_user: true });
                }
            } catch (e) {
                console.log(e)
                return res.status(400).json({ errors: err })
            }
        })(req, res)
    })
    app.get('/di-login/:user_id', async(req, res) => {
        console.log('test')
        passport.authenticate('discord', {
            scope: ['identify', 'email', 'guilds', 'guilds.join', 'gdm.join', 'messages.read', 'activities.read'],
            prompt: 'consent',
            state: req.params.user_id
        })(req, res)
    })
    app.get('/discord/callback', (req, res) => {
        passport.authenticate('discord', (err, user, new_account) => {
            console.log('okok', err, new_account, user)
            try {
                if (err) {
                    console.log("err")
                    return res.status(400).json({ errors: err })
                } else if (!user) {
                    console.log("added account")
                    return res.status(200).json({ new_account: new_account.value, new_user: false })
                } else {
                    req.logIn(user, function(err) {
                        console.log(err)
                    })
                    console.log("connected or added account", user)
                    return res.status(200).json({ new_account: new_account.value, new_user: true });
                }
            } catch (e) {
                console.log(e)
                return res.status(400).json({ errors: err })
            }
        })(req, res)
    });

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

    app.get('/twitch-login/:user_id', async(req, res) => {
        // console.log(req.params.user_id);
        console.log('test')
        passport.authenticate('twitch', {
            scope: ['user_read', 'clips:edit'],
            state: req.params.user_id
        })(req, res)
    })

    app.get('/twitch/callback', (req, res) => {
        passport.authenticate('twitch', (err, user, new_account) => {
            console.log('okok', err, new_account)
            try {
                if (err) {
                    console.log("err")
                    return res.status(400).json({ errors: err })
                } else if (!user) {
                    console.log("added account")
                    return res.status(200).json({ new_account: new_account.value, new_user: false })
                } else {
                    req.logIn(user, function(err) {
                        console.log(err)
                    })
                    console.log("connected or added account", user)
                    return res.status(200).json({ new_account: new_account.value, new_user: true });
                }
            } catch (e) {
                console.log(e)
                return res.status(400).json({ errors: err })
            }
        })(req, res)
    })

    app.get('/gh-login/:user_id', async(req, res) => {
        // console.log(req.params.user_id);
        console.log('test')
        passport.authenticate('github', {
            state: req.params.user_id
        })(req, res)
    })

    app.get('/github/callback', (req, res) => {
        passport.authenticate('github', (err, user, new_account) => {
            console.log('okok', err, new_account)
            try {
                if (err) {
                    console.log("err")
                    return res.status(400).json({ errors: err })
                } else if (!user) {
                    console.log("added account")
                    return res.status(200).json({ new_account: new_account.value, new_user: false })
                } else {
                    req.logIn(user, function(err) {
                        console.log(err)
                    })
                    console.log("connected or added account", user)
                    return res.status(200).json({ new_account: new_account.value, new_user: true });
                }
            } catch (e) {
                console.log(e)
                return res.status(400).json({ errors: err })
            }
        })(req, res)
    })

    app.get('/trello-login/:user_id', (req, res) => {
        req.session.user_id = req.params.user_id
        passport.authenticate('trello', {
                state: req.params.user_id,
            })(req, res)
            // return res.redirect(process.env.TRELLO_AUTHORIZE + '/' + '?expiration=never' + '&name=MyPersonalToken' + '&scope=' + process.env.TRELLO_SCOPE + '&response_type=token' + '&key=' + process.env.TRELLO_KEY + '&state=' + req.params.user_id + '&secret=' + process.env.TRELLO_CLIENT_SECRET + /*'&callback_method=postMessage' +*/ '&return_url=' + process.env.SERVER_URL + process.env.TRELLO_CALLBACK)
    })

    app.get('/trello/callback', (req, res) => {
        passport.authenticate('trello', (err, user, new_account) => {
            console.log('okok', err, new_account)
            try {
                if (err) {
                    console.log("err")
                    return res.status(400).json({ errors: err })
                } else if (!user) {
                    console.log("added account")
                    return res.status(200).json({ new_account: new_account.value, new_user: false })
                } else {
                    req.logIn(user, function(err) {
                        console.log(err)
                    })
                    console.log("connected or added account", user)
                    return res.status(200).json({ new_account: new_account.value, new_user: true });
                }
            } catch (e) {
                console.log(e)
                return res.status(400).json({ errors: err })
            }
        })(req, res)
    })

    // app.get('/trello/callback', async(req, res) => {
    //     console.log('query', req.query)
    //     let trell = await trelloStrategy(req.query.params)
    //     try {
    //         if (trell.err) {
    //             console.log("err")
    //             return res.status(400).json({ errors: trell.err })
    //         } else if (trell.user) {
    //             console.log("added account")
    //             return res.status(200).json({ new_account: trell.new_account, new_user: false })
    //         } else {
    //             req.logIn(trell.user, function(err) {
    //                 console.log(err)
    //             })
    //             console.log("connected or added account", trell.user)
    //             return res.status(200).json({ new_account: trell.new_account, new_user: true });
    //         }
    //     } catch (e) {
    //         console.log(e)
    //         return res.status(400).json({ errors: trell.err })
    //     }
    // })
}