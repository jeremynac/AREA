const express = require('express')
const User = require('@schemas/schemaUser')
const Scripts = require('@schemas/schemaScript')
const Services = require('@schemas/schemaService')
const Action = require('@schemas/schemaAction')
const { checkConnected, getAccountForService } = require('@account/account_functions')
const { checkGmailReceived } = require('@action_triggers/gmail_received')

async function activateAction(accounts, parameters, script_vars, last, action_type) {
    let account_check = await getActionAccount(accounts, action_type)
    if (account_check) {
        console.log('found account for action of type', action_type, account_check)
        return filterAction(account_check, parameters, script_vars, last, action_type)
    } else {
        console.log('did not find account for action of type', action_type)
        return false
    }
}

async function filterAction(account, parameters, script_vars, last, action_type) {
    switch (action_type) {
        case 'gmail-mail-received': // Some are missing right ?
            return checkGmailReceived(account, parameters, script_vars, last);
        case 'gmail-mail-received-match':
            return checkGmailReceivedMatch(account, parameters, script_vars, last);
        case 'youtube-new-video':
            return checkYoutubeVideoReceived(account, parameters, script_vars, last);
        case 'twitch-stream-started':
            return twitchStreamStarted(account, parameters, script_vars, last);
        case 'twitch-channel-followed':
            return twitchChannelFollowed(account, parameters, script_vars, last);
        case 'discord-recieved-message':
            return discordRecievedMessage(account, parameters, script_vars, last);
        default:
            return false;
    }
}

async function checkAction(user_id, action_id) {
    let action = await Action.findById(action_id).select('service').populate('service', 'account')
    if (action) {
        console.log('actionn', action)
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
            console.log(action.service)
            account = await getAccountForService(accounts, action.service._id)
        }
        return account
    } else { //no action
        return null
    }
}

module.exports = {
    activateAction,
    checkAction
}