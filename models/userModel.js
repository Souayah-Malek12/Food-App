const mongoose = require("mongoose")


const userSchema = new mongoose.Schema ({
    userName: {type: String,
                required:[ true, 'user name is required']
    },
    email :{
        type: String,
        required : [true, 'email is required']
    },
    password : {
        type: String,
        required:[true, 'password is required']
    },
    address: {
        type : Array,
    },
    phone: {
        type : Number,
        required:[true, 'phone number is required']
    },
    userType: {
        type: String,
        required: [true, 'user type is required'],
        default : 'client',
        enum: ['client', 'admin', 'vendor', 'driver']
    },
    profile :{
        type: String,
        default: 'data:image/png;base64,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'
    }
},{timestamp: true})

module.exports = mongoose.model("User",userSchema );