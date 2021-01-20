const mongoose = require("mongoose");
const { Trigger } = require('./schemaTrigger')
const { Reaction } = require('./schemaReaction')
const { Scripts } = require('./schemaScript')

const schemaConsequence = mongoose.Schema({
    type: {
        type: String,
        require: true
    },
    parameters: {
        type: Object,
        require: false
    },
    reaction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reaction"
    },
    chained_consequences: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Consequence"
    }],
    triggers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trigger"
    }],
    script: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Script"
    }
});

module.exports = Consequence = mongoose.model("Consequence", schemaConsequence);