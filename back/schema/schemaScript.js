const mongoose = require("mongoose");
const { Service } = require('./schemaService')
const { Action } = require('./schemaAction')
const { Reaction } = require('./schemaReaction')
const { Trigger } = require('./schemaTrigger')
const { Consequence } = require('./schemaConsequence')

const schemaScript = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    action_parameters: {
        type: Object
    },
    action: {
        type: mongoose.Types.ObjectId,
        ref: "Action"
    },
    reaction_parameters: {
        type: Object
    },
    reaction: {
        type: mongoose.Types.ObjectId,
        ref: "Reaction"
    },
    activated: {
        type: Boolean,
        require: false,
        default: true
    }
});

module.exports = Script = mongoose.model("Script", schemaScript);