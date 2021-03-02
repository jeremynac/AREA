const User = require('@schemas/schemaUser')
const Scripts = require('@schemas/schemaScript')
const Services = require('@schemas/schemaService')
const Action = require('@schemas/schemaAction')
const Account = require('@schemas/schemaAccount')
const axios = require('axios')

function makeBody(title, content, description, account) {
    return {
        body: {
            "content": content,
            "tts": false,
            "embed": {
                "title": title,
                "description": description
            }
        },
        header: {
            'Authorization': `token ${account.access_token}`,
            'client-id': process.env.DISCORD_CLIENT_ID
        }
    }
}

async function discordSendMessage(account, parameters, script_vars) {
    let channel_id = "798160246794354688"
    await axios.post('https://discord.com/api/channels/' + channel_id + '/messages',
        makeBody(parameters.title, parameters.content, parameters.description, account)
    ).then((response) => {
        console.log("Success : \n" + response);
        return true
    }).catch(e => {
        console.log(e)
    });
    return false
}

module.exports = {
    discordSendMessage
}