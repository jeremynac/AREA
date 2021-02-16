// var passport = require('passport');
// var AzureStrategy = require('passport-azure-ad').OIDCStrategy
// const User = require('@schemas/schemaUser')
// const { processAccount } = require('@account/account_functions')

// const OfficeStrategy = new AzureStrategy({
//         clientID: process.env.OFFICE_CLIENT_ID,
//         clientSecret: process.env.OFFICE_CLIENT_SECRET,
//         callbackURL: process.env.SERVER_URL + process.env.OFFICE_CALLBACK,
//         resource: process.env.OFFICE_CLIENT_ID,
//         tenant: process.env.OFFICE_TENANT_ID,
//         responseType: 'code',
//         useCookieInsteadOfSession: true,
//         cookieEncryptionKeys: [
//             { key: 'hellottttttttttttttttttttttttttt', iv: 'hellottttttt' }
//         ],
//         redirectUrl: process.env.SERVER_URL + process.env.OFFICE_CALLBACK,
//         passReqToCallback: true,
//         responseMode: 'query',
//         identityMetadata: "https://login.microsoftonline.com/" + process.env.OFFICE_TENANT_ID + "/v2.0/.well-known/openid-configuration"
//     },
//     function(iss, sub, profile, accessToken, refreshToken, done) {
//         console.log('hellohello')

//         // asynchronous verification, for effect...
//         console.log('hellohello')

//     }
// )

// module.exports = OfficeStrategy