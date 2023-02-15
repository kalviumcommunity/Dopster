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
    photo:{
        type:String,
        default:"No photo"
    },
    link:{
type:String,
required:true
    },
    postedBy:{
        type:id,
        ref:"User"
    }
})
mongoose.model("Post",postSchema)