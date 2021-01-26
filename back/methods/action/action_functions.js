const express = require('express')
const User = require('@schemas/schemaUser')
const Scripts = require('@schemas/schemaScript')
const Services = require('@schemas/schemaService')
const Action = require('@schemas/schemaAction')
const { checkConnected, getAccountForService } = require('@account/account_functions')
const { checkGmailReceived } = require('@action_triggers/gmail_received')

async function activateAction(accounts, parameters, script_vars, action_type) {
    let account_check = getActionAccount(accounts, action_type)
    if (account_check) {
        return filterAction(account_check.account, parameters, script_vars, action_type)
    } else {
        return false
    }
}

async function filterAction(account, parameters, script_vars, action_type) {
    switch (action_type) {
        case 'gmail-mail-received':
            return checkGmailReceived(account, parameters, script_vars);
        default:
            return false;
    }
}

async function checkAction(user_id, action_type) {
    let action = await Action.findById(action_id).select('service').populate('service', 'account')
    if (action) {
        return checkConnected(user_id, action.service._id, action.service.account)
    } else {
        return false
    }
}

async function getActionAccount(accounts, action_type) {
    let action = await Action.findOne({ type: action_type }).select('service').populate('service', 'account')
    let account = null;
    if (action) {
        if (action.service.account) { //need account, so check connected
            account = await getAccountForService(accounts, action.service._id)
        }
        return { account: account }
    } else { //no action
        return null
    }
}

module.exports = {
    activateAction,
    checkAction
}