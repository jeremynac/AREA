const mongoose = require("mongoose");
const { Action } = require('./schemaAction')
const { Reaction } = require('./schemaReaction')

const schemaService = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    actions: {
        type: mongoose.Types.ObjectId,
        ref: "Action"
    },
    reactions: {
        type: mongoose.Types.ObjectId,
        ref: "Reaction"
    },
    img: {
        type: String,
        require: true
    }
});

module.exports = Service = mongoose.model("Service", schemaService);