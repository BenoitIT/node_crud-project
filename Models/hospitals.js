const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Hospital = new Schema({
    hospitalName: {
        type: String
    },

    hospitalLocation: {
        type: String
    },
    hospitalEmail: {
        type: String
    },
    province: {
        type: String
    },
    district: {
        type: String
    }

});
module.exports = mongoose.model("hospital", Hospital);