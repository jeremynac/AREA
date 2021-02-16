const express = require('express')
const User = require('@schemas/schemaUser')
const Script = require('@schemas/schemaScript')
const Services = require('@schemas/schemaService')
const Action = require('@schemas/schemaAction')
const { activateAction } = require('@action/action_functions')

async function activate() {
    await activateUsers();
}

async function activateUsers() {
    let users = await User.find().select()
    console.log("activating all users")
    await Promise.allSettled(
        users.map(
            (user_id) => {
                return activateUserScripts(user_id)
            }
        )
    ).then(
        res => {
            console.log(res)
        }
    ).catch(
        e => {
            console.log(e)
        })
}

async function activateUserScripts(user_id) {
    try {
        let user = await User.findById(user_id).select('username accounts scripts').populate('accounts').populate('scripts', 'activated')
        console.log("activating all scripts for user", user.username, user.scripts)
        Promise.allSettled(
            user.scripts.map(
                (script) => {
                    console.log("activating script for user", user.username, "script activated", script.activated)
                    if (script.activated) {
                        return activateScript(script._id, user.accounts)
                    }
                }
            )
        ).then(
            res => {
                console.log(res)
            }
        ).catch(
            e => {
                console.log(e)
            })
    } catch (e) {
        console.log(e)
        return false
    }

}

async function activateScript(script_id, accounts) {
    try {
        let script = await Script.findById(script_id).populate('action', 'service type').populate('reaction', 'service type')
        console.log("activating script", script.name, "with action", script.action._id, "and reaction", script.reaction._id);
        console.log('action is: ', script.action, '\nreaction is: ', script.reaction);
        let action_happened = await activateAction(accounts, script.action_parameters, script.variables, script.action.type)
        if (action_happened) {
            console.log("action happened, activating reaction")
            await activateReaction(accounts, script.reaction_parameters, script.variables, script.reaction.type)
            return true
        } else {
            console.log("action did not happen")
            return false
        }
    } catch (e) {
        console.log("error", e)
        return false
    }
}

module.exports = {
    activate
}