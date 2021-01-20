const express = require('express')
const User = require('@schemas/schemaUser')
const Script = require('@schemas/schemaScript')
const Services = require('@schemas/schemaService')
const Action = require('@schemas/schemaAction')
const { checkAction } = require('@action/action_functions')
const { checkReaction } = require('@reaction/reaction_functions')

async function addScriptUser(script_id, user_id) {
    try {
        let user = await User.findById(user_id)
        console.log(user)
        user.scripts.push(script_id)
        await user.save().then().catch(e => console.log(e))
        return true
    } catch {
        return false
    }
}

async function createScript(req) {
    let action_id = req.body.action.action_id
    let a_parameters = req.body.action.parameters
    let reaction_id = req.body.reaction.reaction_id
    let r_parameters = req.body.reaction.parameters
    let user_id = req.user._id
    console.log('ok')
    if (checkAction(user_id, action_id) && checkReaction(user_id, reaction_id)) {
        let script = await new Script({
            name: req.body.name,
            action: action_id,
            reaction: reaction_id,
            action_parameters: a_parameters,
            reaction_parameters: r_parameters
        })
        console.log('ok')
        await addScriptUser(script._id, user_id)
        await script.save().then().catch()
        return script
    } else {
        console.log('ko')
        return null
    }
}

module.exports = {
    createScript
}