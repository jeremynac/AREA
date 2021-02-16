const mongoose = require("mongoose");
const { Strategy } = require("passport");
const { Action } = require('./schemaAction')
const { Reaction } = require('./schemaReaction')

const schemaService = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        require: true
    },
    account: {
        type: Boolean,
        require: false,
        default: false
    },
    actions: [{
        type: mongoose.Types.ObjectId,
        ref: "Action"
    }],
    reactions: [{
        type: mongoose.Types.ObjectId,
        ref: "Reaction"
    }],
    img: {
        type: String,
        require: false
    },
    parse_map: {
        type: Object,
        require: false
    }
});

module.exports = Service = mongoose.model("Service", schemaService);