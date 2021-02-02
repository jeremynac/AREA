const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const User = require("@schemas/schemaUser");

const LocalSignInStrategy = new LocalStrategy((username, password, done) => {
    User.findOne({ username: username })
        .then(user => {
            console.log("found", user)
            if (!user) {
                return done(null, false, { message: 'No user.' });
            } else if (user.password != password) {
                console.log("wrong pass")
                return done(null, false, { message: 'Incorrect password.' });
            } else {
                return done(null, user);
            }
        })
        .catch(err => {
            console.log("error", err)
            if (err) { return done(err); }
        })
})

const LocalSignUpStrategy = new LocalStrategy({ passReqToCallback: true }, function(req, username, password, done) {
    console.log(username, password)
    User.findOne({ username: username })
        .then(user => {
            console.log("found", user)
            if (!user) {
                console.log("sign up")
                const newUser = new User({ username, password, firstname: req.body.firstname, lastname: req.body.lastname, teacher: req.body.teacher })
                console.log("signed up")
                newUser.save().then(user => { return done(null, user) }).catch(e => {
                    return done(e, null)
                })
            } else if (user.password != password) {
                console.log("wrong pass")
                return done(null, false, { message: 'Incorrect password.' });
            } else {
                return done(null, false, { message: 'already exist.' });
            }
        })
        .catch(err => {
            console.log("error", err)
            if (err) { return done(err); }
        })
})

module.exports = {
    LocalSignUpStrategy,
    LocalSignInStrategy
}