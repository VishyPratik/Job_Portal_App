const mongoose = require("mongoose");
const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    description: {
        type: String,
       // required: true,
    },
    website: {
        type: String,
    },
    location: {
        type: String,
    },
    userId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        
    }]
},
    {
        timestamps: true,
    }

)
module.exports = mongoose.model("Company", companySchema)