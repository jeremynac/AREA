const express = require('express')
const User = require('@schemas/schemaUser')
const Scripts = require('@schemas/schemaScript')
const Services = require('@schemas/schemaService')
const Action = require('@schemas/schemaAction')

module.exports = function(app) {
    app.get('/all', async(req, res) => {
        try {
            let actions = await Action.find().select('name img service').populate('service', 'name');
            return res.status(200).json({ actions: actions })
        } catch (e) {
            return res.status(500).json({ error: e })
        }
    })
    app.get('/information', async(req, res) => {
        try {
            let action = await Action.findById(req.query.id)
            return res.status(200).json({ action: action })
        } catch (e) {
            return res.status(500).json({ error: e })
        }
    })
}