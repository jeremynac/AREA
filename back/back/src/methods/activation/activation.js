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
        let user = await User.findById(user_id).select('accounts scripts').populate('accounts').populate('scripts', 'activated')
        Promise.allSettled(
            user.scripts.map(
                (script) => {
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
        let script = await Script.findById(script_id).populate('action', 'service').populate('reaction', 'service')
        let action_happened = await activateAction(accounts, script.action_parameters, script.variables, script.action.type)
        if (action_happened) {
            await activateReaction(accounts, script.reaction_parameters, script.reaction.type)
            return true
        } else {
            return false
        }
    } catch (e) {
        console.log(e)
        return false
    }
}

module.exports = {
    activate
}