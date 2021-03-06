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
        'broadcaster_id': broadcaster_id
    }
}

async function twitchClipStream(account, parameters, script_vars) {
    let success = false
    let broadcaster_id = ""
    await axios.get('https://api.twitch.tv/helix/users?login=' + parameters.broadcaster_name,
        makeHeader(process.env.TWITCH_CLIENT_ID, account.access_token)
    ).then((response) => {
        if (response.data.data[0])
            broadcaster_id = response.data.data[0].id
    }).catch(e => {
        console.log(e)
    });
    console.log("ID : " + broadcaster_id)
    if (broadcaster_id == "")
        return false

    await axios.post('https://api.twitch.tv/helix/clips',
        makeBody(broadcaster_id),
        makeHeader(process.env.TWITCH_CLIENT_ID, account.access_token)
    ).then((response) => {
        console.log("CLIP URL : " + response.data.data[0].edit_url);
        script_vars.reaction_result = {
            'url': response.data.data[0].edit_url
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