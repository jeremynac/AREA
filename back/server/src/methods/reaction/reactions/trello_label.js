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

async function trelloLabel(account, parameters, script_vars) {

}

module.exports = {
    trelloLabel
}