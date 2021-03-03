const User = require('@schemas/schemaUser')
const Scripts = require('@schemas/schemaScript')
const Services = require('@schemas/schemaService')
const Action = require('@schemas/schemaAction')
const Account = require('@schemas/schemaAccount')
const axios = require('axios')

function makeHeader(client_id, access_token) {
    return {
        headers: {
            'Authorization': "Bearer " + access_token,
            'client-id': client_id
        }
    }
}

function makeBody(broadcaster_id) {
    return {
        'broadcaster-id': broadcaster_id
    }
}

async function twitchClipStream(account, parameters, script_vars) {
    let success = false
    let broadcaster_id = ""
    await axios.get('https://api.twitch.tv/helix/users?login=' + parameters.broadcaster).then((response) => {
        if (response.data.id)
            broadcaster_id = response.data.id
        return
    });

    if (broadcaster_id == "")
        return false

    await axios.post('https://api.twitch.tv/helix/clips',
        makeBody(broadcaster_id),
        makeHeader(process.env.TWITCH_CLIENT_ID, account.access_token)
    ).then((response) => {
        console.log(response.data.edit_url);
        script_vars.action_result = {
            'url': response.data.edit_url
        }
        success = true
        return true
    }).catch(e => {
        console.log(e)
    });
    return success
}

module.exports = {
    twitchClipStream
}