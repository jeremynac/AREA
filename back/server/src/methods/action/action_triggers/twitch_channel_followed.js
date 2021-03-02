const User = require('@schemas/schemaUser')
const Scripts = require('@schemas/schemaScript')
const Services = require('@schemas/schemaService')
const Action = require('@schemas/schemaAction')
const Account = require('@schemas/schemaAccount')
const axios = require('axios')

function getHeader(client_id, account) {
    return {
        headers: {
            'Authorization': `token ${account.access_token}`,
            'client-id': `${client_id}`
        }
    }
}

async function twitchChannelFollowed(account, parameters, script_vars, last_activation) {
    let messages = "";
    await axios.get('GET https://api.twitch.tv/helix/users/follows',//?to_id=' + parameters.to_id,
        getHeader(process.env.TWITCH_CLIENT_ID, account)
    ).then((response) => {
        console.log(response.total);
        if (script_vars.action_result) {
            if (script_vars.action_result.nb_follower < response.total) {
                script_vars.action_result = {
                    'nb_follower' : response.total
                }
                return true
            }
            else {
                script_vars.action_result = {
                    'nb_follower' : response.total
                }
                return false
            }
        }
        script_vars.action_result = {
            'nb_follower' : response.total
        }
        return false
    }).catch(e => {
        console.log(e)
    });
    return false

}


module.exports = {
    twitchChannelFollowed
}