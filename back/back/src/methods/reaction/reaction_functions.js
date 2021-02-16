const express = require('express')
const User = require('@schemas/schemaUser')
const Script = require('@schemas/schemaScript')
const Services = require('@schemas/schemaService')
const Reaction = require('@schemas/schemaAction')
const { checkConnected, getAccountForService } = require('@account/account_functions')
const { reactGmailSendEmail } = require("@reactions/gmail_send")

async function activateReaction(accounts, parameters, script_vars, reaction_type) {
    let account_check = await getReactionAccount(accounts, reaction_type)
    if (account_check) {
        console.log('found account for reaction of type', action_type, account_check)
        return filterReaction(account_check.account, parameters, script_vars, reaction_type)
    } else {
        console.log('did not find account for reaction of type', action_type)
        return false
    }
}

async function filterReaction(account, parameters, script_vars, reaction_type) {
    switch (reaction_type) {
        case 'gmail-send-email':
            return reactGmailSendEmail(account, parameters, script_vars)
        default:
            return false
    }
}

async function checkReaction(user_id, reaction_id) {
    let reaction = await Reaction.findById(reaction_id).select('service').populate('service', 'account')
    console.log(reaction, reaction_id)
    if (reaction) {
        return checkConnected(user_id, reaction.service._id, reaction.service.account)
    } else {
        return false
    }
}

async function getReactionAccount(accounts, reaction_type) {
    let reaction = await Reaction.findOne({ type: reaction_type }).select('service').populate('service', 'account')
    let account;
    if (reaction) {
        if (reaction.service.account) { //need account, so check connected
            account = await getAccountForService(accounts, reaction.service._id)
        }
        return account
    } else { //no action
        return null
    }
}

module.exports = {
    activateReaction,
    checkReaction
}