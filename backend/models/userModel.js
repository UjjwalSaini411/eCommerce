const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        maxLength:[30,"name should not exceed 30 character"],
        minLength:[4,"name should be greater than 4 character"]
    },
    email:{
        type:String,
        required:[true,"Name is required"],
        unique:true,
        validate:[validator,"Enter a valid Email"]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minLength:[30,"Password should be graeter than 8 character"],
        select:false
    },
    avatar:{
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
});
 module.exports = mongoose.model("user",userSchema); 