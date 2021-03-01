const User = require('@schemas/schemaUser')
const Scripts = require('@schemas/schemaScript')
const Services = require('@schemas/schemaService')
const Action = require('@schemas/schemaAction')
const Account = require('@schemas/schemaAccount')
const axios = require('axios')

function makeBody() {

}

async function discordSendMessage(account, parameters, script_vars) {
    /*const oAuth2Client = new google.auth.OAuth2();
    oAuth2Client.setCredentials({ access_token: account.access_token })
    const gmail = google.gmail({ version: "v1", auth: oAuth2Client })*/
}

module.exports = {
    discordSendMessage
}