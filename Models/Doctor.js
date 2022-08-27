const mongoose = require("mongoose");
const schema = mongoose.Schema;
const Doctor = new schema({
    doctor_name: {
        type: String
    },
    doctor_email: {
        type: String
    },
    doctor_age: {
        type: Number
    },
    doctor_nationality: {
        type: String
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "hospital"
    }

});
module.exports = mongoose.model("Doctor", Doctor);