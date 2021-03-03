const User = require('@schemas/schemaUser')
const Scripts = require('@schemas/schemaScript')
const Services = require('@schemas/schemaService')
const Action = require('@schemas/schemaAction')
const Account = require('@schemas/schemaAccount')
const axios = require('axios')

function makeBody(title, content, description) {
    return {
        "content": content,
        "tts": false,
        "embed": {
            "title": title,
            "description": description
        }
    }
}

function getHeader(access_token) {
    return {
        headers: {
            'Authorization': access_token,
            'client-id': process.env.DISCORD_CLIENT_ID
        }
    }
}

async function discordSendMessage(account, parameters, script_vars) {
    let channel_id = "" //"798160246794354688"
    await axios.get('https://discord.com/api/users/@me/channels', getHeader(account.access_token)).then((response) => {
        response.data.forEach(element => {
            if (element.name == parameters.channel_name)
                channel_id = element.id
        });
    }).catch(e => {
        console.log(e)
    });

    if (channel_id == "")
        return false
    let success = false
    await axios.post('https://discord.com/api/channels/' + channel_id + '/messages',
        getHeader(account.access_token),
        makeBody(parameters.title, parameters.content || script_vars.action_result.text, parameters.description)
    ).then((response) => {
        console.log("Success : \n" + response.data);
        success = true
        return true
    }).catch(e => {
        console.log(e)
    });
    return success
}

module.exports = {
    discordSendMessage
}