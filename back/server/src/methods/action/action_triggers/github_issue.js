const User = require('@schemas/schemaUser')
const Scripts = require('@schemas/schemaScript')
const Services = require('@schemas/schemaService')
const Action = require('@schemas/schemaAction')
const Account = require('@schemas/schemaAccount')

function getHeader(access_token) {
    return {
        header: {
            'Authorization': `token ${access_token}`,
            'client-id': process.env.DISCORD_CLIENT_ID
        }
    }
}

async function githubIssue(account, parameters, script_vars, last_activation) {
}


module.exports = {
    githubIssue
}