const express = require('express')
const router = express.Router()

require('dotenv').config()
const mongoose  = require('mongoose')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt  = require('jsonwebtoken')
const secret = process.env.SECRET


const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client("382413014720-hc9v4e6gnh52giikp9u6f0qa79qj0f11.apps.googleusercontent.com");


router.post('/signup',(req,res)=>{
    const {name,email,password} = req.body
    

    if(!email||!password||!name){
       return res.status(422).json({error:"plz add all the fields"})
    }
    User.findOne({email:email}).then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"user allready exists"})
        }
        
        bcrypt.hash(password,12)
        .then(password=>{
            const user= new User ({
                email,
                password,
                name
            })
            user.save()
            .then(user=>{
                res.json({message:"saved successfully"})
    
            })
            .catch(err=>{
                res.status(400).json({error:err.message})
            })
        })

    })
    .catch(err=>{
        res.status(400).json({error:err.message})
    })
})


router.post('/signin',(req,res)=>{
    const {email,password}= req.body

    if(!email||!password){
       return res.status(422).json({error:"plz fill all the fields"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"invalid email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                const {_id,name,email} = savedUser
                // res.json({message:"Successfully signed in"})
                const token = jwt.sign({_id:savedUser._id},secret)
                res.json({token,user:{_id,name,email}})
            }
            else{
               return res.status(422).json({error:"Invalid email or password"})
            }
        })
        .catch(err=>{
           return res.status(400).json({error:err.message})
        })
    })
})
async function verifyToken(token) {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "382413014720-hc9v4e6gnh52giikp9u6f0qa79qj0f11.apps.googleusercontent.com",
    });
    const payload = ticket.getPayload();
    const user = { email: payload.email, name: payload.name };
    return user;
  }
 
router.post('/auth/googleauth',async (req,res)=>{
    const {token} = req.body
    console.log(token)
    if(!token){
        res.status(402).json({error:"token not found"})
    }
    const user = await verifyToken(token)
   
    
    const userexist = await User.findOne({email:user.email})
   
    if(userexist){
        const {_id,name,email} = userexist
        const jwtoken = jwt.sign({_id:userexist._id},secret)
        res.json({jwtoken,user:{_id,name,email}})
       
                
    }
    else{
        const google = await GoogleUser.findOne({email:user.email})

        if(google){
            const jwtoken = jwt.sign({_id:google._id},secret)
            const {_id,name,email} = google
            res.json({jwtoken,user:{_id,name,email}})
        }
        else{
               
        const newuser= await new User ({
            email:user.email,
            password:"",
            name:user.name,
            isGoogleUser:true
        })
        await newuser.save()

        const googleuser = await  User.findOne({email:user.email})
        console.log(user)
        const {_id,name,email} = googleuser
        const jwtoken = jwt.sign({_id:googleuser._id},secret)
        res.json({jwtoken,user:{_id,name,email}})
        }
      
       
       


    }

})


module.exports = router
