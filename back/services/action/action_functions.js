const express = require('express')
const User = require('@schemas/schemaUser')
const Scripts = require('@schemas/schemaScript')
const Services = require('@schemas/schemaService')
const Action = require('@schemas/schemaAction')
const { checkConnected } = require('@account/account_functions')

async function activateAction(accounts, parameters, action_type) {
    return filterAction(accounts, parameters, action_type)
}

async function filterAction(accounts, parameters, action_type) {
    switch (action_type) {
        // case 'timer':
        default: return false
    }
}
async function checkAction(user_id, action_id) {
    let action = await Action.findById(action_id).select('service').populate('service', 'account')
    if (action) {
        return checkConnected(user_id, action.service._id, action.service.account)
    } else {
        return false
    }
}

module.exports = {
    updateAction,
    checkAction
}