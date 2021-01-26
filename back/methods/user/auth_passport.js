const passport = require('passport');
const User = require("@schemas/schemaUser");
const { LocalSignInStrategy, LocalSignUpStrategy } = require('@account/auth_strategies/local');
const FBStrategy = require('@account/auth_strategies/facebook');
const GoStrategy = require('@account/auth_strategies/google')

passport.serializeUser(function(user, done) {
    console.log('serialize', user)
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

// passport.use('google', GoStrategy)

passport.use(GoStrategy)

module.exports = passport;