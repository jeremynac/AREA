const passport = require('passport');
const User = require("@schemas/schemaUser");
const { LocalSignInStrategy, LocalSignUpStrategy } = require('@account/auth_strategies/local');
const FBStrategy = require('@account/auth_strategies/facebook');
const GoStrategy = require('@account/auth_strategies/google');
const TTStrategy = require('@account/auth_strategies/twitter');
const OfficeStrategy = require('@account/auth_strategies/office365');
const DiscordStrategy = require('@account/auth_strategies/discord');
const TWStrategy = require('@account/auth_strategies/twitch')

passport.serializeUser(function(user, done) {
    console.log('serialize', user._id)
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    console.log('deserialize')
    User.findOne({ _id: id })
        .then(user => {
            done(null, user);
        })
        .catch(function(err) {
            done(err, null);
        });
});

passport.use('local-signin', LocalSignInStrategy)

passport.use('local-sign_up', LocalSignUpStrategy)

passport.use('facebook', FBStrategy)

passport.use('google', GoStrategy)

passport.use('discord', DiscordStrategy)

passport.use('twitch', TWStrategy)

// passport.use('office', OfficeStrategy)

// passport.use('twitter', TTStrategy)
// passport.use(GoStrategy)

module.exports = passport;