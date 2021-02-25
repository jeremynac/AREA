const express = require('express')
const User = require('@schemas/schemaUser')
const Service = require('@schemas/schemaService')
const Account = require('@schemas/schemaAccount')
const { getTokenDate } = require('@account/account_validity/utils')
const { default: axios } = require('axios')
var qs = require('qs');

// async function 

function checkTwitchToken(token) {
    let token_date = getTokenDate(token)
    let date = Date.now()
    if (date > token_date) {
        return false
    } else {
        return true
    }
}

async function refreshTwitchToken(account) {
    let refresh = account.refresh_token
    let data = qs.stringify({
        'client_id': process.env.TWITCH_CLIENT_ID,
        'client_secret': process.env.TWITCH_CLIENT_SECRET,
        'grant_type': 'refresh_token',
        'refresh_token': refresh,
        // 'redirect_uri': REDIRECT_URI,
    })
    let config = {
        method: 'post',
        url: 'https://id.twitch.tv/oauth2/token',
        data: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    }
    console.log(refresh)
    let res = await axios(config)
        // res.raise_for_status()
    console.log('refreshed twitch', res.access_token)
    let account_saved = await Account.findById(account._id)
    account_saved.access_token = res.access_token
    await account_saved.save()
    return true
}

async function checkTwitchValidity(account) {
    try {
        console.log('cheking discord validity')
        if (checkTwitchToken(account.access_token)) {
            return true
        } else {
            let token = await refreshTwitchToken(account.refresh_token)
            account.access_token = token
            await account.save()
        }
    } catch (e) {
        console.log(e[0].response)
    }
}

module.exports = {
    checkTwitchValidity,
    refreshTwitchToken
}