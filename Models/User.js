const mongoose = require("mongoose");
const schema = mongoose.Schema;
const User = new schema({
    email: {
        type: String,
        required: true,
        email: true,
        unique: true
    },
    password: {
        type: String,
        reuired: true
    },
    isAdmin: {
        type: Boolean
    }
})
module.exports = mongoose.model("User", User);