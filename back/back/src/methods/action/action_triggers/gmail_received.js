const User = require('@schemas/schemaUser')
const Scripts = require('@schemas/schemaScript')
const Services = require('@schemas/schemaService')
const Action = require('@schemas/schemaAction')
const Account = require('@schemas/schemaAccount')
var Gmail = require('node-gmail-api')

async function checkGmailReceived(account, parameters, script_vars) {
    console.log(account)
    let gmail = new Gmail(account.access_token)
    let i = 0
    let s = gmail.messages('label:inbox', { fields: ['id', 'internalDate', 'labelIds', 'payload'], max: 10 })
    s.on('data', function(d) {
        console.log(d.payload.headers)
    })
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