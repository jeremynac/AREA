const User = require('@schemas/schemaUser')
const Scripts = require('@schemas/schemaScript')
const Services = require('@schemas/schemaService')
const Action = require('@schemas/schemaAction')
const Account = require('@schemas/schemaAccount')
const axios = require('axios')

function getHeader(client_id, access_token) {
    return {
        headers: {
            'Authorization': "Bearer " + access_token,
            'client-id': client_id
        }
    }
}

async function twitchStreamStarted(account, parameters, script_vars, last_activation) {

    let messages = "";
    await axios.get('https://api.twitch.tv/helix/search/channels?query=' + parameters.channel,
        getHeader(process.env.TWITCH_CLIENT_ID, account.access_token)
    ).then((response) => {
        console.log(response.data[0].is_live);
        if (script_vars.action_result) {
            if (response.data[0].is_live && !script_vars.action_result.is_live) {
                script_vars.action_result = {
                    'is_live': response.data[0].is_live,
                    'text': parameters.channel + " has started a stream !"
                }
                return true
            } else {
                script_vars.action_result = {
                    'is_live': response.data[0].is_live
                }
                return false
            }
        }
        script_vars.action_result = {
            'is_live': response.data[0].is_live
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
    twitchStreamStarted
}