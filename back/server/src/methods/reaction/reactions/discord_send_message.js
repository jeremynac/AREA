const User = require('@schemas/schemaUser')
const Scripts = require('@schemas/schemaScript')
const Services = require('@schemas/schemaService')
const Action = require('@schemas/schemaAction')
const Account = require('@schemas/schemaAccount')
const axios = require('axios')

function makeBody() {
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
            'Authorization': `token ${access_token}`,
        }
    }
}

async function discordSendMessage(account, parameters, script_vars) {
    /*const oAuth2Client = new google.auth.OAuth2();
    oAuth2Client.setCredentials({ access_token: account.access_token })
    const gmail = google.gmail({ version: "v1", auth: oAuth2Client })*/
    let channel_id = "798160246794354688"
    await axios.post('https://discord.com/api/channels/' + channel_id + '/messages', makeBody(parameters.title, parameters.content, parameters.description)
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