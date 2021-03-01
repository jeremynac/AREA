const express = require('express')
const User = require('@schemas/schemaUser')
const Service = require('@schemas/schemaService')
const Account = require('@schemas/schemaAccount')
const { getTokenDate, updateAccount } = require('@account/account_validity/utils')
var axios = require('axios')
var qs = require('qs');

// async function 

function checkFacebookToken(token) {
    let token_date = getTokenDate(token)
    let date = Date.now()
    if (date > token_date) {
        return false
    } else {
        return true
    }
}

async function refreshFacebookToken(account) {
    console.log('account', account)
    let url = 'https://graph.facebook.com/{graph-api-version}/oauth/access_token?' + 'grant_type=fb_exchange_token&client_id=' + process.env.FACEBOOK_CLIENT_ID + '&client_secret=' + process.env.FACEBOOK_CLIENT_SECRET + '&fb_exchange_token=' + account.access_token;
    try {
        let res = await axios.get(url)
        if (res) {
            await updateAccount(account._id, res.access_token, response.expires_in)
            return true
        }
    } catch (e) {
        console.log(e)
        return false
    }
    return true
}

async function checkFacebookValidity(account) {
    try {
        console.log('cheking facebook validity')
        if (checkFacebookToken(account.access_token)) {
            return true
        } else {
            let token = await refreshFacebookToken(account.refresh_token)
            account.access_token = token
            await account.save()
        }
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    checkFacebookValidity,
    refreshFacebookToken
}