const express = require('express')
const User = require('@schemas/schemaUser')
const Service = require('@schemas/schemaService')
const Account = require('@schemas/schemaAccount')
const { findUserByGoogle } = require('@services/google_functions')
const { refreshGoogleToken } = require('@account/account_validity/google_validity')
const { refreshDiscordToken } = require('@account/account_validity/discord_validity')
const { refreshTwitchToken } = require('@account/account_validity/twitch_validity')
const { refreshGithubToken } = require('@account/account_validity/github_validity')

async function checkAccountsValidity(accounts_id) {
    try {
        console.log('checking accounts validity', accounts_id)
        await Promise.allSettled(
            accounts_id.map(
                (account_id) => {
                    // console.log("activating script for user", user.username, "script activated", script.activated)
                    if (account_id) {
                        return checkAccountValidity(account_id)
                    }
                }
            )
        ).then(
            res => {
                console.log(res)
            }
        ).catch(
            e => {
                console.log(e)
            })
    } catch (e) {
        console.log(e)
        return false
    }
    console.log('checked account validity')
}

async function checkAccountValidity(account_id) {
    try {
        let account = await Account.findById(account_id).select('service expire refresh_token').populate('service', 'type');
        if (account) {
            console.log('checking account validity', account.service, account_id)
            let date = Date.now()
            console.log(account.expire, date)
            if (account.expire < date) {
                return refreshAccountCredentials(account, account.service.type)
            } else {
                return true
            }
        }
    } catch (e) {
        console.log(e)
        return false
    }
    return false
}

async function refreshAccountCredentials(account, service_type) {
    try {
        console.log('refreshing', service_type)
        return filterAccount(account, service_type)
    } catch (e) {
        console.log(e[0].response)
        return false
    }
}

async function filterAccount(account, service_type) {
    switch (service_type) {
        case 'google':
            return refreshGoogleToken(account)
        case 'discord':
            return refreshDiscordToken(account)
        case 'twitch':
            return refreshTwitchToken(account)
        case 'github':
            return refreshGithubToken(account)
        default:
            return null
    }
}

module.exports = {
    checkAccountsValidity
}