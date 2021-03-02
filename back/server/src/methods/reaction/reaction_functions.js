const express = require('express')
const User = require('@schemas/schemaUser')
const Script = require('@schemas/schemaScript')
const Services = require('@schemas/schemaService')
const Reaction = require('@schemas/schemaReaction')
const { checkConnected, getAccountForService } = require('@account/account_functions')
const { reactGmailSendEmail } = require("@reactions/gmail_send")
const { reactGmailSendSummary } = require("@reactions/gmail_send_summary")
const { reactFacebookPostPage } = require('@reactions/facebook_post_page')

async function activateReaction(accounts, parameters, script_vars, reaction_type) {
    let account_check = await getReactionAccount(accounts, reaction_type)
    if (account_check) {
        console.log('found account for reaction of type', reaction_type, account_check)
        return filterReaction(account_check, parameters, script_vars, reaction_type)
    } else {
        console.log('did not find account for reaction of type', reaction_type)
        return false
    }
}

async function filterReaction(account, parameters, script_vars, reaction_type) {
    switch (reaction_type) {
        case 'gmail-send-email':
            return reactGmailSendEmail(account, parameters, script_vars)
        case 'gmail-send-summary':
            return reactGmailSendSummary(account, parameters, script_vars)
        case 'twitch-clip-stream':
            return twitchClipStream(account, parameters, script_vars);
        case 'discord-send-message':
            return discordSendMessage(account, parameters, script_vars);
        case 'facebook-post-page':
            return reactFacebookPostPage(account, parameters, script_vars)
        case 'github-tag':
            return githubTag(account, parameters, script_vars);
        case 'trello-label':
            return trelloLabel(account, parameters, script_vars)
        default:
            return false
    }
}

async function checkReaction(user_id, reaction_id) {
    let reaction = await Reaction.findById(reaction_id).select('service').populate('service', 'account')
    let reactions = await Reaction.find()
    console.log('reaction', reaction, reaction_id, reactions)
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