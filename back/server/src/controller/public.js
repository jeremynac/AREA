const express = require('express')
const Services = require('@schemas/schemaService')
const Reaction = require('@schemas/schemaReaction');
const Script = require('@schemas/schemaScript')
const Action = require('@schemas/schemaAction')
module.exports = function(app) {
    app.get('/services', async(req, res) => {
        try {
            let services = await Services.find().select('name account service_url img loginIcn')
            return res.status(200).json({ services: services })
        } catch (e) {
            console.log(e)
            return res.status(500).json({ error: e })
        }
    })

    app.get('/reactions', async(req, res) => {
        try {
            let reactions = await Reaction.find().select('name img service').populate('service', 'name');
            return res.status(200).json({ reactions: reactions })
        } catch (e) {
            return res.status(500).json({ error: e })
        }
    })

    app.get('/actions', async(req, res) => {
        try {
            let actions = await Action.find().select('name img service').populate('service', 'name');
            return res.status(200).json({ actions: actions })
        } catch (e) {
            return res.status(500).json({ error: e })
        }
    })

    app.get('/scripts', async(req, res) => {
        try {
            let scripts = await Script.find().select('name img')
            return res.status(200).json({ scripts: scripts })
        } catch (e) {
            return res.status(500).json({ error: e })
        }
    })
}
