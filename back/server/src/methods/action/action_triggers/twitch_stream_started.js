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

function getChannel(channels, channel_name) {
    let res = channels.find(chan =>
        chan.broadcaster_login === channel_name
    )
    if (res) {
        return res
    } else {
        return null
    }
}

async function twitchStreamStarted(account, parameters, script_vars, last_activation) {

    let messages = "";
    let activated = false
    await axios.get('https://api.twitch.tv/helix/search/channels?query=' + parameters.channel,
        getHeader(process.env.TWITCH_CLIENT_ID, account.access_token)
    ).then((response) => {
        var thechannel = getChannel(response.data.data, parameters.channel)
        console.log(thechannel.is_live, thechannel);
        if (script_vars.action_result) {
            if (thechannel.is_live && !script_vars.action_result.is_live) {
                script_vars.action_result = {
                    'is_live': thechannel.is_live,
                    'text': parameters.channel + " has started a stream !",
                    'message': 'Come see ' + parameters.channel + "\'s stream !\n https://www.twitch.tv/" + parameters.channel,
                    'url': "https://www.twitch.tv/" + parameters.channel
                }
                activated = true
                return true
            } else {
                script_vars.action_result = {
                    'is_live': thechannel.is_live
                }
                return false
            }
        }
        script_vars.action_result = {
            'is_live': thechannel.is_live
        }
        return false
    }).catch(e => {
        console.log(e)
    });
    return activated
}


module.exports = {
    twitchStreamStarted
}