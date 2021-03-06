var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('@schemas/schemaUser')
const { processAccount } = require('@account/account_functions')

const GoStrategy = new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.SERVER_URL + process.env.GOOGLE_CALLBACK,
        passReqToCallback: true,
    },
    async function(req, accessToken, refreshToken, params, profile, cb) {
        profile.access_token = accessToken;
        profile.refresh_token = refreshToken;
        profile.expire = params.expires_in
        console.log(accessToken, refreshToken)
        let processed = await processAccount(req.query.state, 'google', profile);
        console.log('ok', processed)
        let user = await User.findById(processed.user_id)
        console.log(user)
        return cb(null, user, { value: processed.new_account })
    }
);

module.exports = GoStrategy