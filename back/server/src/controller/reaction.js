const Reaction = require('@schemas/schemaReaction');
const { getUserReactions } = require('@user/user_functions');

module.exports = function(app) {
    app.get('/all', async(req, res) => {
        try {
            let reactions = await Reaction.find().select('name img service').populate('service', 'name');
            return res.status(200).json({ reactions: reactions })
        } catch (e) {
            return res.status(500).json({ error: e })
        }
    })
    app.get('/information', async(req, res) => {
        try {
            let action = await Action.findById(req.query.id)
            return res.status(200).json({ action: action })
        } catch (e) {
            return res.status(500).json({ error: e })
        }
    })
    app.get('/available', async(req, res) => {
        try {
            let reactions = await getUserReactions(req.user._id)
            return res.status(200).json({ reactions: reactions })
        } catch (e) {
            return res.status(500).json({ error: e })
        }
    })
}