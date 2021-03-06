const express = require('express')
const User = require('@schemas/schemaUser')
const Scripts = require('@schemas/schemaScript')
const Services = require('@schemas/schemaService')
const Action = require('@schemas/schemaAction')
const { checkConnected, getAccountForService } = require('@account/account_functions')
const { checkGmailReceived } = require('@action_triggers/gmail_received')
const { checkGmailReceivedMatch } = require('@action_triggers/gmail_received_match')
const { checkFacebookMentionned } = require('@action_triggers/facebook_mentionned')
const { checkYoutubeVideoReceived } = require('@action_triggers/youtube_new_video')
const { twitchStreamStarted } = require('@action_triggers/twitch_stream_started')
const { twitchChannelFollowed } = require('@action_triggers/twitch_channel_followed')
const { discordRecievedMessage } = require('@action_triggers/discord_server_created')
const { githubIssue } = require('@action_triggers/github_issue')
const { trelloNotif } = require('@action_triggers/trello_notif')




async function activateAction(accounts, parameters, script_vars, last, action_type) {
    let account_check = await getActionAccount(accounts, action_type)
    if (account_check) {
        console.log('found account for action of type', action_type)
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
        case 'discord-server-created':
            return discordServerCreated(account, parameters, script_vars, last);
        case 'facebook-mentionned':
            return checkFacebookMentionned(account, parameters, script_vars, last)
        case 'github-issue':
            return githubIssue(account, parameters, script_vars, last);
        case 'trello-notif':
            return trelloNotif(account, parameters, script_vars, last)
        default:
            return false;
    }
}

async function checkAction(user_id, action_id) {
    let action = await Action.findById(action_id).select('service').populate('service', 'account')
    if (action) {
        console.log('check action', action)
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
        return account
    } else { //no action
        return null
    }
}

module.exports = {
    activateAction,
    checkAction
}