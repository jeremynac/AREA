const User = require('@schemas/schemaUser')
const Scripts = require('@schemas/schemaScript')
const Services = require('@schemas/schemaService')
const Action = require('@schemas/schemaAction')
const Account = require('@schemas/schemaAccount')
const Gmail = require('node-gmail-api')
const { google } = require('googleapis')
const axios = require('axios')

function makeBody(to, from, subject, message) {
    var str = ["Content-Type: text/plain; charset=\"UTF-8\"\n",
        "MIME-Version: 1.0\n",
        "Content-Transfer-Encoding: 7bit\n",
        "to: ", to, "\n",
        "from: ", from, "\n",
        "subject: ", subject, "\n\n",
        message
    ].join('');

    var encodedMail = Buffer.from(str).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');
    return encodedMail;
}

function sendMessage(auth, to, content) {
    var raw = makeBody(to, 'jeremynac@gmail.com', 'test subject', content);
    const gmail = google.gmail({ version: "v1", auth: auth })
    gmail.users.messages.s
    gmail.users.messages.send({
        userId: 'jeremynac@gmail.com',
        resource: {
            raw: raw
        }
    }, function(err, response) {
        console.log(err, response)
    });
}

async function reactGmailSendEmail(account, parameters, script_vars) {
    const oAuth2Client = new google.auth.OAuth2();
    oAuth2Client.setCredentials({ access_token: account.access_token })
    sendMessage(oAuth2Client, parameters.to, parameters.content)
        // oAuth2Client.setCredentials(account.refresh_token)
    const gmail = google.gmail({ version: "v1", auth: oAuth2Client })

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
    reactGmailSendEmail
}