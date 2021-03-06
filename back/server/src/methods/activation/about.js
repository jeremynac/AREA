const express = require('express')
const User = require('@schemas/schemaUser')
const Script = require('@schemas/schemaScript')
const Service = require('@schemas/schemaService')
const Action = require('@schemas/schemaAction')

async function getAbout() {
    try {
        let ip = ctx.request.ip;
        let time = Math.floor(Date.now() / 1000);
        let services = await Service.find().select('name actions reactions').populate('actions', 'name description').populate('reactions', 'name description')
        return {
            client: {
                host: ip
            },
            server: {
                current_time: time,
                services: services
            }
        }
    } catch {
        return { error: 'true' }
    }
}

module.exports = {
    getAbout
}