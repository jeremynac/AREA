const User = require('@schemas/schemaUser')
const Scripts = require('@schemas/schemaScript')
const Services = require('@schemas/schemaService')
const Action = require('@schemas/schemaAction')
const Account = require('@schemas/schemaAccount')
var Gmail = require('node-gmail-api')
const { google } = require('googleapis')

function getHeader(headers, key) {
    let obj = headers.find(e => (e.name.toString() === key))
    return obj.value.toString()
}

async function getChannel(channel_name, yt) {
    try {
        let res = await yt.channels.list({
            forUsername: channel_name,
            maxResults: 1,
            part: ['id', 'status']
        })
        console.log(res.data)
        if (res.data.items) {
            return res.data.items[0]
        }
    } catch (e) {
        console.log(e)
        return null
    }
}

function getResult(snippet, id) {
    let url = "https://www.youtube.com/watch?v=" + id.videoId
    return {
        text: snippet.title,
        message: 'A new video: "' + snippet.title + '" was published by' + snippet.channelTitle + '\nhere is the link: ' + url,
        url: snippet.url,
    }
}

async function checkYoutubeVideoReceived(account, parameters, script_vars, last_activation) {
    console.log(account)
        // let gmail = new Gmail(account.access_token)
    const oAuth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);
    await oAuth2Client.setCredentials({ refresh_token: account.refresh_token })

    const yt = google.youtube({ version: 'v3', auth: oAuth2Client })
    let channel = await getChannel(parameters.channel_name, yt)
    let messages = [];
    let date = new Date(last_activation)
    if (channel) {
        await yt.search.list({
                part: ['snippet'],
                channelId: channel.id,
                maxResults: 4,
                order: "date",
                publishedAfter: date,
                type: 'video'
            }).then(m => {
                messages = m.data.items || [];
            }).catch(e => {
                console.log(e)
            })
            // console.log('fetching channel id: ', parameters.channel_id, 'after: ', last_activation)
        console.log('message', messages)
        if (messages.length > 0) {
            script_vars.action_result = getResult(messages[0].snippet, messages[0].id)
            console.log(script_vars.action_result)
            return true
        }
        return false
            // console.log('fetched emails')
            // return false
    }
}


// app.post('/getLastGmail', checkAuthentication, function (req, res) {
//     User.findOne({ token: req.body.token })
//         .then (user => {
//             if (user && user.googleToken) {
//                 var Gmail = require('node-gmail-api')
//                 , gmail = new Gmail(user.googleToken)
//                 , s = gmail.messages('label:inbox', {max: 1})
//                 s.on('data', function (d) {
//                     console.log(d.snippet)
//                     return res.status(200).json({data: {snippet: d.snippet}});
//                 })
//             } else {
//                 return res.status(400).json({ errors: "CHECK AUTH NO AUTH LOGGED WITH GOOGLE" });
//             }

//         })
// })


module.exports = {
    checkYoutubeVideoReceived
}