const express = require('express')
const User = require('@schemas/schemaUser')
const Service = require('@schemas/schemaService')
const Account = require('@schemas/schemaAccount')
const { getTokenDate } = require('@account/account_validity/utils')
const { default: axios } = require('axios')
const { google } = require('googleapis')

// async function 

async function checkGoogleToken(client) {
    let token_info = await client.getTokenInfo(account.access_token)
    let token_date = token_info.exp
    let date = Date.now()
    if (date > token_date) {
        return false
    } else {
        return true
    }
}

async function refreshGoogleToken(account) {
    try {
        let client = new google.auth.OAuth2();
        console.log('google', account)
        client.setCredentials({ client_id: process.env.GOOGLE_CLIENT_ID, client_secret: process.env.GOOGLE_CLIENT_SECRET, refresh_token: account.refresh_token })
            // if (checkGoogleToken(client)) {
            //     return true
            // } else {
        let token = await client.getAccessToken()
        let account_saved = await Account.findById(account._id)
        account_saved.access_token = token.token
        await account_saved.save()
            // let url = 'https://www.googleapis.com/oauth2/v4/token'
            // let options = {
            //     refresh_token: refresh,
            //     client_id: process.env.GOOGLE_CLIENT_ID,
            //     client_secret: process.env.GOGOLE_CLIENT_SECRET,
            //     grant_type: refresh_token
            // }
            // let res = await axios.post(url, options)
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}

async function checkGoogleValidity(account) {
    try {
        let client = new google.auth.OAuth2();
        console.log('google', account.access_token)
        client.setCredentials({ access_token: account.access_token })
            // if (checkGoogleToken(client)) {
            //     return true
            // } else {
        let token = await client.getAccessToken()
        account.access_token = token.token
        await account.save()
            // }
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    checkGoogleValidity,
    refreshGoogleToken
}