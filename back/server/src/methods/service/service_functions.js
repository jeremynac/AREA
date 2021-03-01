const express = require('express')
const User = require('@schemas/schemaUser')
const Scripts = require('@schemas/schemaScript')
const Service = require('@schemas/schemaService')
const Reaction = require('@schemas/schemaReaction')
const Action = require('@schemas/schemaAction')

async function findUserByServiceAccount(service_type, profile) {
    try {
        let service = await Service.findOne({ type: service_type }).select('')
        console.log(service)
        let account = await Account.find({ email: profile.email, service: service._id })
        console.log('test', account)
        return account[0] || null
    } catch (e) {
        console.log(e)
        return null
    }
}

module.exports = {
    findUserByServiceAccount
}