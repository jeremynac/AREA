const User = require('@schemas/schemaUser')
const Service = require('@schemas/schemaService')
const Action = require('@schemas/schemaAction')
const Reaction = require('@schemas/schemaReaction')

async function getUserServices(user_id) {
    let user = await User.findById(user_id).select('accounts').populate('accounts', 'service')
    let services = user.accounts.map(account => account.service)
    return services
}

async function getUserActions(user_id) {
    let services = await getUserServices(user_id)
    let actions = await Action.find({ service: { $in: services } })
    return actions
}

async function getUserReactions(user_id) {
    let services = await getUserServices(user_id)
    let reactions = await Reaction.find({ service: { $in: services } })
    return reactions
}
async function getUserServicesStatus(user_id) {
    let services_connected = await getUserServices(user_id)
    let services_all = await Service.find()
    let services = []
    let connected = false;
    services_all.map(s => {
        if (services_connected.includes(s._id)) {
            connected = true
        } else {
            connected = false
        }
        services.push({ service: s, connected: connected })
    })
    console.log(services)
    return services
}

module.exports = {
    getUserServices,
    getUserActions,
    getUserReactions,
    getUserServicesStatus
}