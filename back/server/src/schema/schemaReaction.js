const mongoose = require("mongoose");
const { Service } = require('./schemaService')


const schemaReaction = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service"
    },
    parameters: {
        type: Object,
        require: false
    },
    img: {
        type: String,
        require: true
    }
});

module.exports = Reaction = mongoose.model("Reaction", schemaReaction);