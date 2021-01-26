const passport = require('passport');
const User = require("@schemas/schemaUser");
const { LocalSignInStrategy, LocalSignUpStrategy } = require('@account/auth_strategies/local');
const FBStrategy = require('@account/auth_strategies/facebook');
const GoStrategy = require('@account/auth_strategies/google')

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
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

module.exports = passport;