const User = require('@schemas/schemaUser')
const Scripts = require('@schemas/schemaScript')
const Services = require('@schemas/schemaService')
const Action = require('@schemas/schemaAction')
const Account = require('@schemas/schemaAccount')
const axios = require('axios')

function getHeader(client_id, access_token) {
    return {
        headers: {
            'Authorization': `token ${access_token}`,
            'client-id': `${client_id}`
        }
    }
}

async function twitchStreamStarted(account, parameters, script_vars, last_activation) {
    /*const oAuth2Client = new google.auth.OAuth2();
    oAuth2Client.setCredentials({ access_token: account.access_token })
    const gmail = google.gmail({ version: "v1", auth: oAuth2Client })*/
    let messages = "";
    await axios.get('https://api.twitch.tv/helix/search/channels?query=' + parameters.channel, {
        getHeader(client_id, access_token)
    }
    ).then((response) => {
        console.log(response.data[0].is_live);
        if (response.data[0].is_live)
            messages = true;
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
    twitchStreamStarted
}