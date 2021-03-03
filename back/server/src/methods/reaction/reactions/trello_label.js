const User = require('@schemas/schemaUser')
const Scripts = require('@schemas/schemaScript')
const Services = require('@schemas/schemaService')
const Action = require('@schemas/schemaAction')
const Account = require('@schemas/schemaAccount')
const axios = require('axios')

function makeParams(access_token, name, board_id, color) {
    return '?key=' + process.env.TRELLO_KEY + '&token=' + access_token + '&name=' + name + '&color=' + color + '&idBoard=' + board_id;
}

async function trelloLabel(account, parameters, script_vars) {
    let board_id = ""
    await axios.get('https://api.trello.com/1/members/' + parameters.username + '/boards?token=' + account.access_token + '&key=' + process.env.TRELLO_KEY).then((response) => {
        response.data.forEach(element => {
            if (element.url == parameters.board_url || element.shortUrl == parameters.board_url)
                board_id = element.id
        });
    }).catch(e => {
        console.log(e)
    });
    if (board_id === "")
        return false
    let success = false
    await axios.post('https://api.trello.com/1/labels' + makeParams(account.access_token, parameters.label_name || script_vars.action_result.text, board_id, parameters.color || "pink")).then((response) => {
        console.log("Success : \n" + response.data);
        success = true
        return true
    }).catch(e => {
        console.log(e)
    });
    return success
}

module.exports = {
    trelloLabel
}