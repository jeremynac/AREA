const User = require('@schemas/schemaUser')
const Scripts = require('@schemas/schemaScript')
const Services = require('@schemas/schemaService')
const Action = require('@schemas/schemaAction')
const Account = require('@schemas/schemaAccount')
const { google } = require('googleapis');

async function reactGmailSendEmail(account, parameters, script_vars) {
    const gmail = google.gmail({ version: "v1", access_token: account })
    gmail.users.labels.list({
        userId: 'me',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const labels = res.data.labels;
        if (labels.length) {
            console.log('Labels:');
            labels.forEach((label) => {
                console.log(`- ${label.name}`);
            });
        } else {
            console.log('No labels found.');
        }
    });
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