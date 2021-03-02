const User = require('@schemas/schemaUser')
const Scripts = require('@schemas/schemaScript')
const Services = require('@schemas/schemaService')
const Action = require('@schemas/schemaAction')
const Account = require('@schemas/schemaAccount')

function getHeader(access_token) {
    return {
        header: {
            'Authorization': `token ${access_token}`,
            'client-id': DISCORD_CLIENT_ID
        }
    }
}

async function discordRecievedMessage(account, parameters, script_vars, last_activation) {

    let channel_id = "798160246794354688"
    await axios.get('https://discord.com/api/channels/' + channel_id + '/messages', makeBody(account.access_token)
    ).then((response) => {
        console.log("Success : \n" + response);
        if (script_vars.action_result) {
            if (script_vars.action_result.lenght < response.lenght) {
                script_vars.action_result = {
                    'lenght' : response.lenght
                }
                return true
            }
            else {
                script_vars.action_result = {
                    'lenght' : response.lenght
                }
                return false
            }
        }
        script_vars.action_result = {
            'lenght' : response.lenght
        }
        return false
    }).catch(e => {
        console.log(e)
    });
    return false
}


module.exports = {
    discordRecievedMessage
}