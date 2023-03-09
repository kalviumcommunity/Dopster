const mongoose = require('mongoose')
const id=mongoose.Schema.Types.ObjectId
const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        default:true
    },
    link:{
        type:String,
        required:true
    },
    likes:[{type:id,ref:"User"}],
    photo:{
        type:String,
        required:true
    },
    postedBy:{
        type:id,
        ref:"User"
    }
},{timestamps:true})

mongoose.model("Post",postSchema)