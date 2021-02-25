const express = require('express')
const User = require('@schemas/schemaUser')
const Service = require('@schemas/schemaService')
const Account = require('@schemas/schemaAccount')
const { getTokenDate } = require('@account/account_validity/utils')
var axios = require('axios')
var qs = require('qs');

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
    console.log('account', account)
    var data = qs.stringify({
        'client_id': '810912093909286923',
        'client_secret': 'xEjlWuogRuuxmjNUFRSfnKWVDo9iP39k',
        'grant_type': 'refresh_token',
        'refresh_token': 'V41XdghATsNMYwg6cvhW8wSE3EowPk'
    });
    var config = {
        method: 'post',
        url: 'https://discord.com/api/v8/oauth2/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: data
    };

    axios(config)
        .then(function(response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function(error) {
            console.log(error);
        });
    // let data = qs.stringify({
    //     'client_id': process.env.TWITCH_CLIENT_ID,
    //     'client_secret': process.env.TWITCH_CLIENT_SECRET,
    //     'grant_type': 'refresh_token',
    //     'refresh_token': refresh,
    //     'redirect_uri': 'https://nicememe.website',
    //     // 'redirect_uri': REDIRECT_URI,
    //     'scope': 'identify email connections'
    // })
    // let config = {
    //     method: 'post',
    //     url: 'https://discord.com/api/v8/oauth2/token',
    //     data: data,
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //     }
    // }
    // let res = await axios(config).then().catch(e => console.log('error', e.response.data))
    // res.raise_for_status()
    // let account_saved = await Account.findById(account._id)
    // account_saved.access_token = res.json().access_token
    // account_saved.expire = res.expires_in
    // console.log('refreshed discord', res.json().access_token)
    // await account_saved.save()

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