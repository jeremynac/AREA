const express = require('express')
const Service = require('@schemas/schemaService')

async function getAbout(req) {
    try {
        let ip = req.ip;
        let time = Math.floor(Date.now() / 1000);
        let services = await Service.find().select('name actions reactions -_id').populate('actions', 'name description -_id').populate('reactions', 'name description -_id')
        return {
            client: {
                host: ip
            },
            server: {
                current_time: time,
                services: services
            }
        }
    } catch (e) {
        console.log(e)
        return { error: 'true' }
    }
}

module.exports = {
    getAbout
}