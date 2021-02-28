const mongoose = require("mongoose");
const { Service } = require('./schemaService')


const schemaAction = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    description: {
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
        require: false
    }
});

module.exports = Action = mongoose.model("Action", schemaAction);