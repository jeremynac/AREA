// // var Trello = require("node-trello");
const { processAccount } = require('@account/account_functions')
    // const { default: axios } = require('axios')


// async function trelloStrategy(params) {
//     try {
//         console.log(params)
//         let token = params.token
//         let user_id = params.state
//             // var t = new Trello(process.env.TRELLO_KEY, token);
//         let profile = await axios.get(process.env.TRELLO_URL + '/1/members/me/' + '?key=' + process.env.TRELLO_KEY + '&token=' + token)
//         console.log(profile)
//             // profile.access_token = token
//             // let processed = await processAccount(user_id, 'trello', profile)
//             // let user = await User.findById(processed.user_id)
//             // return { error: null, user, new_account: processed.new_account }
//     } catch (e) {
//         console.log(e)
//         return { error: true, user: null, new_account: false }
//     }
// }

// module.exports = {
//     trelloStrategy,
// }

const { Strategy: TrelloStrategy } = require('passport-trello');


const User = require('@schemas/schemaUser')

const TrellStrategy = new TrelloStrategy({
        consumerKey: process.env.TRELLO_KEY,
        consumerSecret: process.env.TRELLO_CLIENT_SECRET,
        callbackURL: process.env.TRELLO_CALLBACK,
        passReqToCallback: true,
        trelloParams: {
            scope: "read,write,account",
            name: "MyApp",
            expiration: "never",
        },
    },
    async(req, token, tokenSecret, profile, cb) => {
        console.log(token, tokenSecret, profile)
        profile.access_token = token;
        let processed = await processAccount(req.query.state, 'trello', profile);
        console.log('ok', processed)
        let user = await User.findById(processed.user_id)
        return cb(null, user, { value: processed.new_account })
    });

module.exports = TrellStrategy