var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('@schemas/schemaUser')
const { processAccount } = require('@account/account_functions')

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
const GoStrategy = new GoogleStrategy({
        clientID: '981693314082-f1pl5dsdqpmanurdvkl308g526g8jiic.apps.googleusercontent.com',
        clientSecret: 'kad3xaBRgTuNNFD4BepPf_Lh',
        callbackURL: "http://localhost:8084/auth/google/callback",
        passReqToCallback: true,
    },
    async function(req, accessToken, refreshToken, profile, cb) {
        let processed = await processAccount(req, 'google', { access_token: accessToken, refresh_token: refreshToken, profile: profile._json });
        console.log('ok', processed)
        let user = await User.findById(processed.user_id)
        return cb(null, user, { value: processed.new_account })
    }
);

module.exports = GoStrategy