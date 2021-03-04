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
        let script = await Script.findById(script_id)
        console.log(user)
        user.scripts.push(script)
        await user.save().then().catch(e => console.log(e))
        await script.save().then().catch(e => console.log(e))
        return true
    } catch {
        return false
    }
}

async function createScript(req) {
    let action_id = req.body.action.action_id,
        reaction_id = req.body.reaction.reaction_id;
    let a_parameters = req.body.action.parameters,
        r_parameters = req.body.reaction.parameters
    let user_id = req.user._id
    let activated = req.activated
    let check = await checkScriptCreation(user_id, action_id, reaction_id)
    console.log('ok')
    if (check) {
        let script = new Script({
            name: req.body.name,
            action: action_id,
            reaction: reaction_id,
            action_parameters: a_parameters,
            reaction_parameters: r_parameters,
            last_activation: Math.floor(Date.now() / 1000),
            script_vars: {},
            activated: activated
        })
        console.log('script has been succesfully created')
        await script.save().then().catch()
        await addScriptUser(script._id, user_id)
        return script._id
    } else {
        console.log('problem script')
        return null
    }
}

async function checkScriptCreation(user_id, action_id, reaction_id) {
    let check_action = await checkAction(user_id, action_id);
    let check_reaction = await checkReaction(user_id, reaction_id);
    console.log(check_action, check_reaction)
    return check_action && check_reaction;
}

async function updateScript(id, updated_script) {
    try {
        // let script = await Script.findById(id).populate('action_parameters reaction_parameters')
        let action_id = updated_script.action
        let reaction_id = updated_script.reaction
        let a_params = updated_script.action.parameters
        let r_params = updated_script.reaction.parameters

        // if (script) {
        //     Object.keys(updated_script).map(
        //         key => {
        //             if (key) {
        //                 script[key] = updated_script[key]
        //             }
        //         }
        //     )
        //     await script.save()
        //     console.log('modified script')
        //     return true
        // }
        await Script.update({ _id: id }, { $set: { action_id: action_id, reaction_id: reaction_id, action_parameters: a_params, reaction_parameters: r_params, activated: updated_script.activated, name: updated_script.name } })
        return true
    } catch (e) {
        console.log(e)
        return false
    }
    return false
}

module.exports = {
    createScript,
    updateScript
}