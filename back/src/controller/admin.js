const express = require('express')
const passport = require('passport')
const User = require('@schemas/schemaUser')
const Scripts = require('@schemas/schemaScript')
const Services = require('@schemas/schemaService')
const { activate } = require('@activation/activation')

function auth_admin(req, res, next) {
    console.log("try")
    console.log(req.user)
    console.log(req.session)
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: 'not connected' })
    }
    const user = await User.findById(req.user._id)
    if (user.username == 'admin') {
        next()
    } else {
        return res.status(401).json({ error: 'not the admin' })
    }
}

module.exports = function(app) {
    app.get('/activate', auth_admin, (req, res) => {
        try {
            await activate()
            return res.status(200).json("success activate")
        } catch (e) {
            console.log(e)
            return res.status(400).json({ errors: e })
        }
    })
}