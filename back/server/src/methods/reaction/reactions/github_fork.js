const User = require('@schemas/schemaUser')
const Scripts = require('@schemas/schemaScript')
const Services = require('@schemas/schemaService')
const Action = require('@schemas/schemaAction')
const Account = require('@schemas/schemaAccount')
const axios = require('axios')

async function githubFork(account, parameters, script_vars) {
    let success = false

    var config = {
        method: 'post',
        url: 'https://api.github.com/repos/' + parameters.owner + '/' + parameters.repository + '/forks',
        headers: {
            'Authorization': 'token ' + account.access_token
        }
    };

    axios(config)
        .then(function(response) {
            console.log("DONE : Check at " + response.data.html_url);
            success = true
        })
        .catch(function(error) {
            console.log(error);
        });
    console.log(account.access_token)
    return success
}

module.exports = {
    githubFork
}