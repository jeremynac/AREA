const mongoose = require("mongoose");
const { Service } = require('./schemaService')


const schemaAction = mongoose.Schema({
    name: {
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
    img: {
        type: String,
        require: true
    }
});

module.exports = Action = mongoose.model("Action", schemaAction);