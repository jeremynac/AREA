const express = require('express')
const Services = require('@schemas/schemaService')
const Reaction = require('@schemas/schemaReaction')
const Action = require('@schemas/schemaAction')
const { getUserServicesStatus } = require('../methods/user/user_functions')

module.exports = function(app) {
    app.get('/reactions', async(req, res) => {
        try {
            let service = await Services.findOne({ name: { $eq: req.query.name } }).select('reactions').populate('reactions', 'name img')
            return res.status(200).json({ reactions: service.reactions })
        } catch (e) {
            console.log(e)
            return res.status(500).json({ error: e })
        }
    })
    app.get('/actions', async(req, res) => {
        try {
            let service = await Services.findOne({ name: { $eq: req.query.name } }).select('actions').populate('actions', 'name img')
            return res.status(200).json({ actions: service.actions })
        } catch (e) {
            console.log(e)
            return res.status(500).json({ error: e })
        }
    })
    app.get('/all', async(req, res) => {
        try {
            let services = await Services.find().select('name account')
            return res.status(200).json({ services: services })
        } catch (e) {
            console.log(e)
            return res.status(500).json({ error: e })
        }
    })
    app.get('/everything', async(req, res) => {
        try {
            let services = await Services.find().populate('actions reactions')
            return res.status(200).json({ services: services })
        } catch (e) {
            console.log(e)
            return res.status(500).json({ error: e })
        }
    })
    app.get('/add/action', async(req, res) => {
        try {
            let service = await Services.findOne({ name: req.query.name })
            console.log(service)
                // service.actions = [req.query.action_id]
            let action = await Action.findById(req.query.action_id)
            console.log(action)
                // service.actions.push(action)
                // console.log(service)
                // await service.save().then().catch()
            return res.status(200).json({ service: service })
        } catch (e) {
            console.log(e)
            return res.status(500).json({ error: e })
        }
    })
    app.get('/all/status', async(req, res) => {
        try {
            let services = await getUserServicesStatus(req.user._id)
            return res.status(200).json({ services: services })
        } catch (e) {
            console.log(e)
            return res.status(500).json({ error: e })
        }
    })
}