require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require("mongoose")
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(require('./routes/auth'))
app.use('/projects',require('./routes/post'))





 
mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(7000,()=>{
        console.log("connected to mondodb  & listening to 7000")
    })

}).catch((error)=>{
    console.log(error)
})

