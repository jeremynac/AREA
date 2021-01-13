const mongoose = require("mongoose");
const { Service } = require('./schemaService')

const schemaAccount = mongoose.Schema({
    service: {
        type: mongoose.Types.ObjectId,
        ref: "Service"
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
    password: {
        type: String,
        require: false
    }
});

module.exports = Account = mongoose.model("Account", schemaAccount);