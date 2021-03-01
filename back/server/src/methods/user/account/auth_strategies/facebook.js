var express = require('express');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
const User = require('@schemas/schemaUser')
const { processAccount } = require('@account/account_functions')


const FBStrategy = new Strategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.SERVER_URL + process.env.FACEBOOK_CALLBACK,
    profileFields: ['id', 'displayName', 'photos', 'email'],
    passReqToCallback: true,
}, async(req, accessToken, refreshToken, params, profile, cb) => {
    console.log(accessToken, refreshToken, profile, req.query)
    profile.access_token = accessToken;
    profile.refresh_token = refreshToken;
    profile.expire = params.expires_in
    console.log(accessToken, refreshToken)
    let processed = await processAccount(req.query.state, 'google', profile);
    console.log('ok', processed)
    let user = await User.findById(processed.user_id)
    return cb(null, user, { value: processed.new_account })
        // In this example, the user's Facebook profile is supplied as the user
        // record.  In a production-quality application, the Facebook profile should
        // be associated with a user record in the application's database, which
        // allows for account linking and authentication with other identity
        // providers.
    return cb(null, profile);
});

module.exports = FBStrategy