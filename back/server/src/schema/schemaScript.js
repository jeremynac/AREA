const mongoose = require("mongoose");
const { Service } = require('./schemaService')
const { Action } = require('./schemaAction')
const { Reaction } = require('./schemaReaction')

const schemaScript = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    variables: {
        type: Object,
        require: false
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
    },
    last_activation: {
        type: Number,
        require: false,
        default: 0
    }
});

module.exports = Script = mongoose.model("Script", schemaScript);