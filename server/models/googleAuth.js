const mongoose = require("mongoose")

const googleSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }

})

mongoose.model("GoogleUser",googleSchema)