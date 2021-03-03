const User = require('@schemas/schemaUser')
const Scripts = require('@schemas/schemaScript')
const Services = require('@schemas/schemaService')
const Action = require('@schemas/schemaAction')
const Account = require('@schemas/schemaAccount')
const axios = require('axios')

function getHeaderJson(access_token) {
    return {
        headers: {
            'accept': "application/vnd.github.v3+json",
            'Authorization': access_token,
            'client-id': process.env.GITHUB_CLIENT_ID
        }
    }
}

async function githubFork(account, parameters, script_vars) {
    let success = false
    await axios.get('https://api.github.com/repos/' + parameters.path_to_owner + '/' + parameters.path_to_repo + '/forks',
        getHeaderJson(account.access_token)
    ).then((response) => {
        console.log(response.data)
        success = true
        return true
    }).catch(e =>
        console.log(e)
    )
    return success
}

module.exports = {
    githubFork
}