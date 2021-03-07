const User = require('@schemas/schemaUser')
const Notification = require('@schemas/schemaNotification')
const Service = require('@schemas/schemaService')
const Action = require('@schemas/schemaAction')
const Reaction = require('@schemas/schemaReaction')
const user = require('../../controller/user')

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
    let services_all = await Service.find().select('name type description service_url img loginIcn')
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

async function addNotif(message, user_id) {
    try {
        let date = Date.now()
        let user = await User.findById(user_id)
        console.log('adding notif')
        let notif = await new Notification({ message: message, date: date })
        user.notifications.push(notif)
        await user.save()
        await notif.save()
    } catch (e) {
        console.log(e)
    }

}

module.exports = {
    getUserServices,
    getUserActions,
    getUserReactions,
    getUserServicesStatus,
    addNotif
}