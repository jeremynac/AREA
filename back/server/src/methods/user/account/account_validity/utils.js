const express = require('express')
const jwt_decode = require("jwt-decode");

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

module.exports = {
    getTokenDate
}