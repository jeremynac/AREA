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

async function checkGmailReceived(account, parameters, script_vars, last_activation) {
    console.log(account)
        // let gmail = new Gmail(account.access_token)
    const oAuth2Client = new google.auth.OAuth2();
    oAuth2Client.setCredentials({ access_token: account.access_token })
        // oAuth2Client.setCredentials(account.refresh_token)
    const gmail = google.gmail({ version: "v1", auth: oAuth2Client })
        // let author_params = parameters.author.toString()
    let messages = [];
    await gmail.users.messages.list({
        userId: 'me',
        q: 'label:inbox ' + 'from:' + parameters.author + ' after:' + last_activation.toString(),
        // fields: ['id', 'internalDate', 'labelIds', 'payload'],
        max: 1
    }).then(m => {
        messages = m.data.messages || [];
    }).catch(e => {
        console.log(e)
    })

    // let s = gmail.messages('label:inbox ' + 'from:' + parameters.author + ' after:' + last_activation.toString(), { fields: ['id', 'internalDate', 'labelIds', 'payload'], max: 1 })
    console.log('fetching emails author: ', parameters.author, 'after: ', last_activation)
        // s.on('data', function(d) {
        //     // let author = getHeader(d.payload.headers, "From")
        //     // if (author === author_params) {
        //     //     return true
        //     // }
        //     console.log('test')
        // })
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
    checkGmailReceived
}