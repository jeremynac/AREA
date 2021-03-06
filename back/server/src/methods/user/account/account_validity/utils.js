const express = require('express')
const jwt_decode = require("jwt-decode");
const Account = require('@schemas/schemaAccount')

function getTokenDate(token) {
    let tokens = token.split('.')
        // let str = atob(tokens[1])
        // console.log(str)
        // let obj = JSON.parse(str)
    console.log(token)
    let obj = jwt_decode(tokens[1])
    console.log(obj)
    return obj[exp]
}

async function updateAccount(account_id, token, expire) {
    let account = await Account.findById(account_id)
    if (account) {
        account.access_token = token
        account.expire = expire
        await account.save()
    }
}

module.exports = {
    getTokenDate,
    updateAccount
}