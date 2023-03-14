const jwt = require('jsonwebtoken')

require('dotenv').config()
const mongoose = require('mongoose')
const User  =mongoose.model("User")

module.exports=(req,res,next)=>{
    const {authorization}= req.headers
    if(!authorization){
        return res.status(401).json({error:"you must me logged in"})
    }
const token = authorization.replace("Bearer ","")
jwt.verify(token,process.env.SECRET,(err,payload)=>{
    if(err){
       return res.status(401).json({error:"you must be logged in"})
    } 
    const {_id} =payload
    User.findById(_id).then(async userData=>{
      
        req.user= userData
        console.log(userData)
     
        next()
    })
   
})

}
