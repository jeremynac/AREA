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

async function checkYoutubeVideoReceived(account, parameters, script_vars, last_activation) {
    console.log(account)
        // let gmail = new Gmail(account.access_token)
    const oAuth2Client = new google.auth.OAuth2();
    oAuth2Client.setCredentials({ access_token: account.access_token })
        // oAuth2Client.setCredentials(account.refresh_token)
    const yt = google.youtube({ version: 'v3', auth: auth })
    let channel_id = parameters.channel_id
    let messages = [];
    await yt.search.list({
        channelId: channel_id,
        maxResults: 10,
        order: "date",
        publishedAfter: last_activation.toString()
    }).then(m => {
        messages = m.data.messages || [];
    }).catch(e => {
        console.log(e)
    })
    console.log('fetching channel id: ', parameters.channel_id, 'after: ', last_activation)
    consele.log('message', messages)
    if (messages.length > 0) {
        return true
    } else {
        return false
    }
    // console.log('fetched emails')
    // return false
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