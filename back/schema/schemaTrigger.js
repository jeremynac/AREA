const mongoose = require("mongoose");
const { Service } = require('./schemaService')
const { Action } = require('./schemaAction')
const { Script } = require('./schemaScript')
const { Account } = require('./schemaAccount')
const { User } = require('./schemaUser')

const schemaTrigger = mongoose.Schema({
    type: {
        type: String,
        require: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    parameters: {
        type: Object,
        require: false
    },
    account: {
        type: mongoose.Types.ObjectId,
        ref: "Account"
    },
    action: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Action"
    },
    causes_triggers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trigger"
    }],
    scripts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Script"
    }],
    state: {
        type: Boolean,
        require: false
    }
});

module.exports = Trigger = mongoose.model("Trigger", schemaTrigger);