var GitHubStrategy = require('passport-github').Strategy;
const User = require('@schemas/schemaUser')
const { processAccount } = require('@account/account_functions')

const GHStrategy = new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.SERVER_URL + process.env.GITHUB_CALLBACK,
        passReqToCallback: true,
        scope: ['repo', 'notifications', 'user']

    },
    async function(req, accessToken, refreshToken, params, profile, cb) {
        profile.access_token = accessToken;
        profile.refresh_token = refreshToken;
        profile.expire = params.expires_in
        console.log(req, accessToken, refreshToken, params, profile)
        let processed = await processAccount(req.query.state, 'github', profile);
        console.log('ok', processed)
        let user = await User.findById(processed.user_id)
        return cb(null, user, { value: processed.new_account })
    })

module.exports = GHStrategy