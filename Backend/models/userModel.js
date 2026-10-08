const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        unique:true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
       
    },
     image: {
        type:String,
    },
    phoneNumber: {
        type: Number,
        required: true,
        
    },
    role: {
        type: String,
        enum: ["Student", "Recruiter"],
        default:"Student",
    },
    profile: {
        bio: {
            type:String,
        },
        skills: [{
            type: String,
        }],
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Company",
        },
       
    },

}, {
    timestamps:true,
}
    
)
module.exports = mongoose.model("User", userSchema)