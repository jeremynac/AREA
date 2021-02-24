const express = require('express')
const User = require('@schemas/schemaUser')
const Service = require('@schemas/schemaService')
const Account = require('@schemas/schemaAccount')
const { getTokenDate } = require('@account/account_validity/utils')
const { default: axios } = require('axios')

// async function 

function checkDiscordToken(token) {
    let token_date = getTokenDate(token)
    let date = Date.now()
    if (date > token_date) {
        return false
    } else {
        return true
    }
}

async function refreshDiscordToken(account) {
    let refresh = account.refresh_token
    let data = {
        'client_id': DISCORD_CLIENT_ID,
        'client_secret': DISCORD_CLIENT_SECRET,
        'grant_type': 'refresh_token',
        'refresh_token': refresh,
        // 'redirect_uri': REDIRECT_URI,
        'scope': 'identify email connections'
    }
    let headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    let res = await axios.post('https://discord.com/api/v6/oauth2/token', data, headers)
    res.raise_for_status()
    let account_saved = await Account.findById(account._id)
    account_saved.access_token = res.json().access_token
    await account_saved.save()

    return true
}

async function checkDiscordValidity(account) {
    try {
        console.log('cheking discord validity')
        if (checkDiscordToken(account.access_token)) {
            return true
        } else {
            let token = await refreshDiscordToken(account.refresh_token)
            account.access_token = token
            await account.save()
        }
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    checkDiscordValidity,
    refreshDiscordToken
}