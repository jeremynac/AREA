const User = require('@schemas/schemaUser')
const Scripts = require('@schemas/schemaScript')
const Services = require('@schemas/schemaService')
const Action = require('@schemas/schemaAction')
const Account = require('@schemas/schemaAccount')
const axios = require('axios')

function makeBodyFirst(access_token) {
    return {
        body: {
            'token': access_token,
            'key': process.env.TRELLO_KEY
        }
    }
}

function makeBody(access_token, name, board_id, color=pink) {
    return {
        body: {
            'token': access_token,
            'key': process.env.TRELLO_KEY,
            'name': name,
            'color': color,
            'idBoard': board_id
        }
    }
}

async function trelloLabel(account, parameters, script_vars) {
    let board_id = ""
    await axios.get('https://api.trello.com/1/members/' + parameters.username + '/boards', makeBodyFirst(account.access_token)
    ).then((response) => {
        response.forEach(element => {
            if (element.url == parameters.board_url || element.shortUrl == parameters.board_url)
                board_id = element.id
        });
    }).catch(e => {
        console.log(e)
    });

    if (board_id == "")
        return false

    await axios.post('https://api.trello.com/1/labels', makeBody(account.access_token, parameters.label_name, board_id, parameters.color)
    ).then((response) => {
        console.log("Success : \n" + response);
        return true
    }).catch(e => {
        console.log(e)
    });
    return false
}

module.exports = {
    trelloLabel
}