const User = require('@schemas/schemaUser')
const Scripts = require('@schemas/schemaScript')
const Services = require('@schemas/schemaService')
const Action = require('@schemas/schemaAction')
const Account = require('@schemas/schemaAccount')
const axios = require('axios')

function dateToTime(date) {
    return (Date.parse(date) / 1000)
}

async function githubIssue(account, parameters, script_vars, last_activation) {
    var config = {
        method: 'get',
        url: 'https://api.github.com/issues',
        headers: {
            'Accept': "application/vnd.github.v3+json",
            'Authorization': 'token ' + account.access_token
        }
    };
    let activated = false
    await axios(config)
        .then(function(response) {
            // console.log(response.data)
            response.data.forEach(element => {
                console.log(element.updated_at)
                if (element.title.includes(parameters.issue_keyword)) {
                    console.log(last_activation, dateToTime(element.updated_at))
                    if (last_activation < dateToTime(element.updated_at)) {
                        script_vars.action_result = {
                            'message': "An issue was open:\n" + element.body + "\nThe url is " + element.html_url,
                            'title': element.title,
                            'text': "A issue with keyword " + parameters.issue_keyword + " is now " + element.state,
                            'url': element.html_url
                        }
                        activated = true
                        return true
                    }
                }
                return false
            });
        })
        .catch(function(error) {
            console.log(error);
        });
    return activated
}


module.exports = {
    githubIssue
}