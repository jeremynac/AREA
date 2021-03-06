const User = require('@schemas/schemaUser')
const Scripts = require('@schemas/schemaScript')
const Services = require('@schemas/schemaService')
const Action = require('@schemas/schemaAction')
const Account = require('@schemas/schemaAccount')
const axios = require('axios')

async function trelloNotif(account, parameters, script_vars, last_activation) {
    await axios.get('https://api.trello.com/1/members/' + parameters.username + '/notifications?token=' + account.access_token + '&key=' + process.env.TRELLO_KEY).then((response) => {
        console.log("Success : \n" + response.data);
        if (script_vars.action_result) {
            console.log("NOTIF TRELLO : " + response.data.length, script_vars.action_result)
            if (script_vars.action_result.last_notif && script_vars.action_result.last_notif.id != response.data[response.data.length - 1].id) {
                script_vars.action_result = {
                    'last_notif': response.data[response.data.length - 1],
                    'text': "Notification received on trello"
                }
                return true
            } else {
                script_vars.action_result = {
                    'last_notif': response.data[response.data.length - 1]
                }
                return false
            }
        }
        script_vars.action_result = {
            'last_notif': response.data[response.data.length - 1]
        }
        return false
    }).catch(e => {
        console.log(e)
    });
    if (script_vars.action_result.text)
        return true
    return false
}


module.exports = {
    trelloNotif
}