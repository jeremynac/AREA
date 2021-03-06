var passport = require('passport');
var TwitchStrategy = require('passport-twitch-new').Strategy;
const User = require('@schemas/schemaUser')
const { processAccount } = require('@account/account_functions')

const TWStrategy = new TwitchStrategy({
        clientID: process.env.TWITCH_CLIENT_ID,
        clientSecret: process.env.TWITCH_CLIENT_SECRET,
        callbackURL: process.env.SERVER_URL + process.env.TWITCH_CALLBACK,
        passReqToCallback: true,
    },
    async function(req, accessToken, refreshToken, params, profile, cb) {
        profile.access_token = accessToken;
        profile.refresh_token = refreshToken;
        profile.expire = params.expires_in
        console.log(accessToken, refreshToken, profile)
        let processed = await processAccount(req.query.state, 'twitch', profile);
        console.log('ok', processed)
        let user = await User.findById(processed.user_id)
        return cb(null, user, { value: processed.new_account })
    }
);

module.exports = TWStrategy