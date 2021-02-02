var express = require('express');
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;

const TTStrategy = new Strategy({
    consumerKey: TWITTER_CLIENT_ID,
    consumerSecret: TWITTER_CLIENT_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK
}, async(accessToken, refreshToken, profile, cb) => {
    console.log(accessToken, refreshToken, profile)
        // In this example, the user's Facebook profile is supplied as the user
        // record.  In a production-quality application, the Facebook profile should
        // be associated with a user record in the application's database, which
        // allows for account linking and authentication with other identity
        // providers.
    return cb(null, profile);
});

module.exports = TTStrategy