const User = require('@schemas/schemaUser')
const Scripts = require('@schemas/schemaScript')
const Services = require('@schemas/schemaService')
const Action = require('@schemas/schemaAction')
const Account = require('@schemas/schemaAccount')
const axios = require('axios')

function makeBody(access_token) {
    return {
        headers: {
            'Authorization': "Bearer " + access_token,
            'client-id': process.env.DISCORD_CLIENT_ID
        }
    }
}

async function discordServerCreated(account, parameters, script_vars, last_activation) {
    let success = false
    await axios.get('https://discord.com/api/users/@me/guilds', makeBody(account.access_token)).then((response) => {
        if (script_vars.action_result) {
            if (script_vars.action_result.number < response.data.length) {
                if (response.data[response.data.length - 1].name.includes(parameters.server_keyword)) {
                    script_vars.action_result = {
                        'number': response.data.length,
                        'text': "The server " + response.data[response.data.length - 1].name + " was just created on Discord!",
                        'url': "https://discord.com/channels/" + response.data[response.data.length - 1].id
                    }
                    success = true
                    return true
                }
                script_vars.action_result = {
                    'number': response.data.length
                }
                return false
            } else {
                script_vars.action_result = {
                    'number': response.data.length
                }
                return false
            }
        }
        script_vars.action_result = {
            'number': response.data.length
        }
        return false
    }).catch(e => {
        console.log(e)
    });
    return success
}


module.exports = {
    discordServerCreated
}