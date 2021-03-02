const express = require('express')
const User = require('@schemas/schemaUser')
const Service = require('@schemas/schemaService')
const Account = require('@schemas/schemaAccount')
var generator = require('generate-password');
const { findUserByGoogle } = require('@services/google_functions')
const { findUserByServiceAccount } = require('@service/service_functions')

async function authCallback(err, user, new_account) {
    console.log('okok', new_account)
    try {
        if (err) {
            console.log("err")
            return res.status(400).json({ errors: err })
        } else if (!user) {
            console.log("added account")
            return res.status(200).json({ new_account: new_account.value, new_user: false })
        } else {
            console.log("connected or added account", user)
            console.log('okokok')
            req.logIn(user, function(err) {
                console.log(err)
            })
            console.log("err", user)
            console.log("connected or added account", user)
            return res.status(200).json({ new_account: new_account.value, new_user: true });
        }
    } catch (e) {
        console.log(e)
        return res.status(400).json({ errors: err })
    }
}

async function checkConnected(user_id, service_id, need_account) {
    if (!need_account) {
        return true;
    }
    console.log('check connected', service_id, need_account)
    let account = await Account.findOne({ $and: [{ service: service_id }, { user: user_id }] });
    console.log(account)
    if (account) {
        return true;
    } else {
        return false;
    }
}

async function getAccountForService(accounts, service_id) {
    let account = accounts.find(a => {
        console.log(a.service, service_id, JSON.stringify(a.service), JSON.stringify(service_id), typeof(a.service), typeof(service_id))
        if (JSON.stringify(a.service) === JSON.stringify(service_id)) {
            return true
        } else {
            return false
        }
    });
    console.log(account, accounts, service_id)
    if (account) {
        return account;
    } else {
        return null;
    }
}

async function findUserByAccount(service_type, args) {
    console.log(service_type, args)
    return findUserByServiceAccount(service_type, args)
        // switch (service_type) {
        //     case 'google':
        //         return findUserByGoogle(args)
        //     default:
        //         return null
        // }
}

async function createAccount(service_type, args) {
    console.log('find service', service_type, args)
    const service = await Service.findOne({ type: service_type }).select()
    let account = new Account({ service: service, access_token: args.access_token, refresh_token: args.refresh_token, authorization_code: args.authorization_code, username: args.username, email: args.email, expire: args.expire, service_id: args.id })
        // aaccount.save();
    Object.entries(args).map((key, index) => {
        account.key = args[key]
    })
    let i = 0;
    await account.save()
    console.log('new account:', account)
    return account;
}

async function addAccountToUser(user_id, service_type, args) {
    try {
        let user = await User.findById(user_id);
        let account = await createAccount(service_type, args);
        account.user = user;
        await account.save()
        user.accounts.push(account);
        await user.save();
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}

async function createUserAndAccount(service_type, args) {
    let account = await createAccount(service_type, args)
    let password = generator.generate({
        length: 10,
        numbers: true
    });
    let user = new User({
        password: password,
        email: args.email,
        firstname: args.firstname,
        lastname: args.lastname,
        username: args.username || args.email || args.name,
        img: args.img,
        accounts: [account]
    })
    await user.save().then().catch(e => console.log(e));
    console.log('created new user', user);
    account.user = user;
    await account.save().then().catch(e => console.log(e));
    console.log('saved account')
    return user._id;
}

async function findOrCreateUser(service_type, args) {
    try {
        let user = await findUserByAccount(service_type, args)
        if (user) {
            console.log('found user', user)
        } else {
            console.log('not found user')
            user = await createUserAndAccount(service_type, args)
            console.log('new user:', user)
        }
        return user;
    } catch (e) {
        console.log(e)
        return null
    }
}

async function getParseMap(service_type) {
    let service = await Service.findOne({ type: service_type }).select('parse_map')
    console.log(service)
    let parse_map = service.parse_map
    return parse_map
}

async function parseArgs(args, service_type) {
    let new_args = {}
    let parse_map = await getParseMap(service_type)
    Object.keys(parse_map).forEach(key => {
        new_args[key] = eval('args.' + parse_map[key])
    });
    return new_args
}

async function processAccount(user_id, service_type, args) {
    try {
        let parsed_args = await parseArgs(args, service_type);
        let success, found;
        if (user_id) {
            console.log('already logged in')
            found = await findUserByAccount(service_type, parsed_args)
            console.log('found', found)
            if (!found) { //check that no user already has an account with those credentials
                success = await addAccountToUser(user_id, service_type, parsed_args);
                return { user_id: null, new_account: true, success: success };
            } else {
                return { user_id: null, new_account: false, success: false }
            }
        } else {
            console.log('not logged in')
            let user = await findOrCreateUser(service_type, parsed_args);
            console.log('got user')
            if (user) {
                return { user_id: user, new_account: false, success: true }
            } else {
                return { user_id: null, new_account: false, success: false }
            }
        }
    } catch (e) {
        console.log(e)
        return null
    }
}

module.exports = {
    checkConnected,
    getAccountForService,
    processAccount,
    authCallback
}