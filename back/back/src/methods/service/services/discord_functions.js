const Account = require('@schemas/schemaAccount')

async function findUserByDiscord(args) {
    console.log(args)
    let email = args.email;
    if (email) {
        let account = await Account.findOne({ username: email }).select('user');
        console.log('account:', account)
        if (account) {
            return account.user;
        } else {
            return null
        }
    } else {
        return null
    }
}

module.exports = {
    findUserByDiscord,
    discordParseArgs
}