const express = require('express')
const User = require('@schemas/schemaUser')
const Script = require('@schemas/schemaScript')
const Services = require('@schemas/schemaService')
const Reaction = require('@schemas/schemaAction')

async function activateReaction(account, parameters, reaction_type) {
    return filterReaction(account, parameters, reaction_type)
}

async function filterReaction(account, parameters, reaction_type) {
    switch (reaction_type) {
        // case 'timer':
        default: return false
    }
}

async function checkReaction(user_id, reaction_id) {
    let reaction = await Reaction.findById(reaction_id).select('service').populate('service', 'account')
    if (reaction) {
        return checkConnected(user_id, reaction.service._id, reaction.service.account)
    } else {
        return false
    }
}

module.exports = {
    launchReaction,
    checkReaction
}