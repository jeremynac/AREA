const mongoose = require("mongoose");
const { Account } = require('./schemaAccount')
const { Script } = require('./schemaScript')

const schemaUser = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    firstname: {
        type: String,
        required: false,
    },
    lastname: {
        type: String,
        required: false
    },
    accounts: [{
        type: mongoose.Types.ObjectId,
        ref: "Account"
    }],
    scripts: {
        type: mongoose.Types.ObjectId,
        refs: "Script",
    },
    img: {
        type: String,
        require: false
    }
});

module.exports = User = mongoose.model("User", schemaUser);