const mongoose = require("mongoose");
const { Service } = require('./schemaService')
const { Action } = require('./schemaAction')
const { Reaction } = require('./schemaReaction')


const schemaScript = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    action: {
        type: mongoose.Types.ObjectId,
        ref: "Action"
    },
    reactions: [{
        type: mongoose.Types.ObjectId,
        ref: "Reaction"
    }],
    img: {
        type: String,
        require: false
    }
});

module.exports = Script = mongoose.model("Script", schemaScript);