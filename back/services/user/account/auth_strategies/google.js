var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

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
    function(token, tokenSecret, profile, done) {
        console.log("access token: ", token);
        User.findOrCreate({ googleId: profile.id }, function(err, user) {
            return done(err, user);
        });
    }
);

module.exports = GoStrategy