const User = require('@schemas/schemaUser')
const Scripts = require('@schemas/schemaScript')
const Services = require('@schemas/schemaService')
const Action = require('@schemas/schemaAction')
const Account = require('@schemas/schemaAccount')
const axios = require('axios')

function makeHeader(client_id, access_token){
    return {
        headers: {
            'Authorization': `token ${access_token}`,
            'client-id': `${client_id}`
        }
    }
}

function makeBody(broadcaster_id) {
    return {
        'broadcaster-id': `${broadcaster_id}`
    }
}

async function twitchClipStream(account, parameters, script_vars) {
    await axios.post('https://api.twitch.tv/helix/clips',
        makeBody(parameters.broadcaster_id),
        makeHeader(process.env.TWITCH_CLIENT_ID, account.access_token)
    ).then((response) => {
        console.log(response.edit_url);
        script_vars.action_result = {
            'url': response.edit_url
        }
        return true
    }).catch(e => {
        console.log(e)
    });
    return false
}

module.exports = {
    twitchClipStream
}