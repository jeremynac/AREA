const User = require('@schemas/schemaUser')
const Scripts = require('@schemas/schemaScript')
const Services = require('@schemas/schemaService')
const Action = require('@schemas/schemaAction')
const Account = require('@schemas/schemaAccount')

function getHeader(access_token) {
    return {
        header: {
            'Authorization': `token ${access_token}`,
        }
    }
}

async function discordRecievedMessage(account, parameters, script_vars, last_activation) {

    let channel_id = "798160246794354688"
    await axios.get('https://discord.com/api/channels/' + channel_id + '/messages', makeBody(account.access_token)
    ).then((response) => {
        console.log("Success : \n" + response);
        //if (response.lenght != than before)
        return true
    }).catch(e => {
        console.log(e)
    });
    return false
}


module.exports = {
    discordRecievedMessage
}