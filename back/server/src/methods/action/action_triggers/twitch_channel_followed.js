const User = require('@schemas/schemaUser')
const Scripts = require('@schemas/schemaScript')
const Services = require('@schemas/schemaService')
const Action = require('@schemas/schemaAction')
const Account = require('@schemas/schemaAccount')
const axios = require('axios')

function getHeader(client_id, account) {
    return {
        headers: {
            'Authorization': "Bearer " + account.access_token,
            'client-id': client_id
        }
    }
}

function dateToTime(date) {
    return (Date.parse(date) / 1000)
}

async function getUser(account) {
    try {
        let res = await axios.get('https://api.twitch.tv/helix/users', getHeader(process.env.TWITCH_CLIENT_ID, account))
        console.log(res.data)
        if (res.data.data) {
            return res.data.data[0]
        }
    } catch (e) {
        console.log(e)
        return null
    }
}

async function twitchChannelFollowed(account, parameters, script_vars, last_activation) {
    let messages = "";
    let user = await getUser(account)
    let activated = false
    console.log(user)
    if (user) {
        await axios.get('https://api.twitch.tv/helix/users/follows?to_id=' + user.id,
            getHeader(process.env.TWITCH_CLIENT_ID, account)
        ).then((response) => {
            console.log("TOTAL FOLLOWERS" + response.data.total);
            if (script_vars.action_result) {
                if (script_vars.action_result.nb_follower < response.data.total) {
                    script_vars.action_result = {
                        nb_follower: response.data.total,
                        text: "New twitch follower : " + response.data.data[0].from_name,
                        message: "Someone followed you on twitch !",
                    }
                    activated = true
                    return true
                } else {
                    script_vars.action_result = {
                        nb_follower: response.data.total
                    }
                    return false
                }
            }
            script_vars.action_result = {
                nb_follower: response.data.total
            }
            return false
        }).catch(e => {
            console.log(e)
        });
    }
    return activated

}


module.exports = {
    twitchChannelFollowed
}