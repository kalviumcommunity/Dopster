require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require("mongoose")
require('./models/userModel')
require('./models/postModel')
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))





 
mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(6000,()=>{
        console.log("connected to mondodb  & listening to 6000")
    })

}).catch((error)=>{
    console.log(error)
})

