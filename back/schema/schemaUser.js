const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
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
    assignments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assignment"
    }],
    date: {
        type: Date,
        default: Date.now
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }],
    owned_courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }],
    owned_assignments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assignment"
    }],
    teacher: [{
        type: Boolean,
        req: true
    }]

});

module.exports = User = mongoose.model("User", userSchema);