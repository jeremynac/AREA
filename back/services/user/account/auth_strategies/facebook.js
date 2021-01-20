var express = require('express');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;

const FBStrategy = new Strategy({
    clientID: '3559131270830430',
    clientSecret: 'e3fc574d5aa9fda80bee0ee9f13a10ac',
    callbackURL: '/return'
}, async(accessToken, refreshToken, profile, cb) => {
    // In this example, the user's Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    return cb(null, profile);
});

module.exports = FBStrategy