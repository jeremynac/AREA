const passport = require("passport");
const { Strategy /*, Scope*/ } = require('@oauth-everything/passport-discord');
const { processAccount } = require("@account/account_functions");

var scopes = ['identify', 'email', 'guilds', 'guilds.join'];

const DiscordStrategy = new Strategy({
        clientID: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
        callbackURL: process.env.SERVER_URL + process.env.DISCORD_CALLBACK,
        passReqToCallback: true,
        scope: scopes
    },
    async function(req, accessToken, refreshToken, profile, cb) {
        profile.access_token = accessToken;
        profile.refresh_token = refreshToken;
        console.log(profile)
        let processed = await processAccount(req.query.state, 'discord', profile);
        let user = await User.findById(processed.user_id);
        return cb(null, user, { value: processed.new_account });

        // User.findOrCreate({ discordId: profile.id }, function(err, user) {
        //     return cb(err, user);
        // });
    });

module.exports = DiscordStrategy