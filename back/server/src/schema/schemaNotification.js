const mongoose = require("mongoose");
const { Account } = require('./schemaAccount')
const { Script } = require('./schemaScript')

const schemaNotification = mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    date: {
        type: Number,
        require: false
    }
});

module.exports = Notification = mongoose.model("Notification", schemaNotification);