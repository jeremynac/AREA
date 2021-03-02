const User = require('@schemas/schemaUser')
const Scripts = require('@schemas/schemaScript')
const Services = require('@schemas/schemaService')
const Action = require('@schemas/schemaAction')
const Account = require('@schemas/schemaAccount')
const axios = require('axios')

function makeBody(parameters) {
    return {
        headers: {
            'Authorization': `token ${parameters.access_token}`,
            'broadcaster-id': `${parameters.broadcaster_id}`
        }
    }
}

async function twitchClipStream(account, parameters, script_vars) {
    /*const oAuth2Client = new google.auth.OAuth2();
    oAuth2Client.setCredentials({ access_token: account.access_token })
    const gmail = google.gmail({ version: "v1", auth: oAuth2Client })*/
    let messages = "";
    await axios.post('https://api.twitch.tv/helix/clips', {
        makeBody(parameters)
    }
    ).then((response) => {
        console.log(response.edit_url);
        if (response.edit_url.length > 0)
            messages = response.edit_url;
    }).catch(e => {
        console.log(e)
    });

    if (messages.length > 0) {
        return true
    } else {
        return false
    }
}

module.exports = {
    twitchClipStream
}