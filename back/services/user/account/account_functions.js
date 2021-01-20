const express = require('express')
const User = require('@schemas/schemaUser')
const Script = require('@schemas/schemaScript')
const Services = require('@schemas/schemaService')
const Action = require('@schemas/schemaAction')
const Consequence = require('@schemas/schemaConsequence')
const Account = require('@schemas/schemaAccount')

async function checkConnected(user_id, service_id, need_account) {
    if (!need_account) {
        return true
    }
    let account = Account.findOne({ $and: [{ service: service_id }, { user: user_id }] });
    if (account) {
        return true
    } else {
        return false
    }
}

module.exports = {
    checkConnected,
}