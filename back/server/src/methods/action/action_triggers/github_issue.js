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

async function githubIssue(account, parameters, script_vars, last_activation) {
    await axios.get('https://api.github.com/issues',
        getHeaderJson(account.access_token)
    ).then((response) => {
        response.data.forEach(element => {
            if (element.title.contains(parameters.issue_keyword)) {
                if (script_vars.action_result) {
                    if (script_vars.action_result.state != element.state) {
                        script_vars.action_result = {
                            'state': element.state,
                            'text': "A issue with your keyword is now " + element.state
                        }
                        return true
                    }
                    script_vars.action_result = {
                        'state': element.state
                    }
                }
                script_vars.action_result = {
                    'state': element.state
                }
            }
            return false
        });
    }).catch(e => {
        console.log(e)
    })
    if (script_vars.action_result.text)
        return true
    return false
}


module.exports = {
    githubIssue
}