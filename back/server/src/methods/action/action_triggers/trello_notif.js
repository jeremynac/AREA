const User = require('@schemas/schemaUser')
const Scripts = require('@schemas/schemaScript')
const Services = require('@schemas/schemaService')
const Action = require('@schemas/schemaAction')
const Account = require('@schemas/schemaAccount')

function makeBody(access_token) {
    return {
        body: {
            'token': access_token,
            'key': process.env.TRELLO_KEY
        }
    }
}

async function trelloNotif(account, parameters, script_vars, last_activation) {
    await axios.get('https://api.trello.com/1/members/' + parameters.username + '/notifications', makeBody(account.access_token)
    ).then((response) => {
        console.log("Success : \n" + response);
        if (script_vars.action_result) {
            if (script_vars.action_result.nb_notif < response.lenght) {
                script_vars.action_result = {
                    'nb_notif' : response.lenght
                }
                return true
            }
            else {
                script_vars.action_result = {
                    'nb_notif' : response.lenght
                }
                return false
            }
        }
        script_vars.action_result = {
            'nb_notif' : response.lenght
        }
        return false
    }).catch(e => {
        console.log(e)
    });
    return false
}


module.exports = {
    trelloNotif
}