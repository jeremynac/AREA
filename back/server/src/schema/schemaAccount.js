const mongoose = require("mongoose");
const { Service } = require('./schemaService')
const { User } = require('./schemaUser')

const schemaAccount = mongoose.Schema({
    service: {
        type: mongoose.Types.ObjectId,
        ref: "Service"
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    access_token: {
        type: String,
        require: false
    },
    refresh_token: {
        type: String,
        require: false
    },
    autorization_code: {
        type: String,
        require: false
    },
    username: {
        type: String,
        require: false
    },
    email: {
        type: String,
        require: false
    },
    password: {
        type: String,
        require: false
    },
    expire: {
        type: Number,
        require: false
    }
});

module.exports = Account = mongoose.model("Account", schemaAccount);