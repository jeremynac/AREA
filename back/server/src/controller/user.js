const express = require('express')
const passport = require('passport')
const User = require('@schemas/schemaUser')
const Script = require('@schemas/schemaScript')
const Services = require('@schemas/schemaService')

function auth(req, res, next) {
    console.log("try")
    console.log(req.user)
    console.log(req.session)
    if (req.isAuthenticated()) {
        next()
    } else if (req.user) {
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

    app.post('/update', auth, async function(req, res) {
        let user = await User.findById(req.user.id);
        user.firstname = req.body.firstname
        user.lastname = req.body.lastname
        user.username = req.body.username
        user.email = req.body.email
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
            let user = await User.findById(req.user._id).select("-_id scripts").populate([{ path: "scripts", model: "Script" }]);
            return res.status(200).json({ scripts: user.scripts })
        } catch (e) {
            return res.status(500).json({ error: e })
        }
    })
    app.get('/accounts', auth, async function(req, res) {
        try {
            let user = await User.findById(req.user._id).select("-_id accounts").populate([{ path: "accounts", model: "Account" }]);
            return res.status(200).json({ accounts: user.accounts })
        } catch (e) {
            return res.status(500).json({ error: e })
        }
    })

    app.get('/info', async(req, res) => {
        try {
            let user = await User.findById(req.user._id).select("firstname lastname email username");
            return res.status(200).json(user)
        } catch (e) {
            return res.status(500).json({ error: e })
        }
    })
}