const express = require('express')
const User = require('@schemas/schemaUser')
const Service = require('@schemas/schemaService')
const Account = require('@schemas/schemaAccount')
const { getTokenDate } = require('@account/account_validity/utils')
const { default: axios } = require('axios')
var qs = require('qs');

// async function 

function checkGithubToken(token) {
    let token_date = getTokenDate(token)
    let date = Date.now()
    if (date > token_date) {
        return false
    } else {
        return true
    }
}

async function refreshGithubToken(account) {
    let refresh = account.refresh_token
    let data = qs.stringify({
        'client_id': process.env.GITHUB_CLIENT_ID,
        'client_secret': process.env.GITHUB_CLIENT_SECRET,
        'grant_type': 'refresh_token',
        'refresh_token': refresh,
        // 'redirect_uri': REDIRECT_URI,
    })
    let config = {
        method: 'post',
        url: 'https://id.github.tv/oauth2/token',
        data: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    }
    console.log(refresh)
    let res = await axios(config)
        // res.raise_for_status()
    console.log('refreshed github', res.access_token)
    let account_saved = await Account.findById(account._id)
    account_saved.access_token = res.access_token
    await account_saved.save()
    return true
}

async function checkGithubValidity(account) {
    try {
        console.log('cheking discord validity')
        if (checkGithubToken(account.access_token)) {
            return true
        } else {
            let token = await refreshGithubToken(account.refresh_token)
            account.access_token = token
            await account.save()
        }
    } catch (e) {
        console.log(e[0].response)
    }
}

module.exports = {
    checkGithubValidity,
    refreshGithubToken
}