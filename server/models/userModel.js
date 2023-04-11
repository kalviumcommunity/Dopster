const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        
      },
    password:{
        type:String,
        // required:true
    },
    isGoogleUser:{
        type:Boolean,
        default:false
    },
    resetToken:{
        type:String
    },
    dopeCredits:{
        type:Number,
        default:0
    }
})

module.exports = mongoose.model("User",userSchema)