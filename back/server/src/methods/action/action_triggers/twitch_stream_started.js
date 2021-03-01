const User = require('@schemas/schemaUser')
const Scripts = require('@schemas/schemaScript')
const Services = require('@schemas/schemaService')
const Action = require('@schemas/schemaAction')
const Account = require('@schemas/schemaAccount')

function getHeader(headers, key) {
    /*let obj = headers.find(e => (e.name.toString() === key))
    return obj.value.toString()*/
}

async function twitchStreamStarted(account, parameters, script_vars, last_activation) {
    /*const oAuth2Client = new google.auth.OAuth2();
    oAuth2Client.setCredentials({ access_token: account.access_token })
    const gmail = google.gmail({ version: "v1", auth: oAuth2Client })
    let messages = [];
    await gmail.users.messages.list({
        userId: 'me',
        q: 'label:inbox ' + 'from:' + parameters.author + ' after:' + last_activation.toString(),
        max: 1
    }).then(m => {
        messages = m.data.messages || [];
    }).catch(e => {
        console.log(e)
    })

    if (messages.length > 0) {
        return true
    } else {
        return false
    }*/
}


module.exports = {
    twitchStreamStarted
}