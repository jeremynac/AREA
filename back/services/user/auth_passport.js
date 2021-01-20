const passport = require('passport');
const User = require("@controller/schema/schemaUser");
const { LocalSignInStrategy, LocalSignUpStrategy } = require('@account/auth_strategies/local');
const FBStrategy = require('@account/passport_strategies/facebook');

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

passport.use('fb-signin', FBStrategy)

app.use()

module.exports = passport;