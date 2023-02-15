const express = require('express')
const router = express.Router()
const mongoose  = require('mongoose')
require('dotenv').config()
const User = mongoose.model("User")
const bcrypt = require('bcrypt')
const jwt  = require('jsonwebtoken')
const secret = process.env.SECRET
const requireLogin = require('../middleware/requireLogin')


router.post('/signup',(req,res)=>{
    const {name,email,password} = req.body

    if(!email||!password||!name){
       return res.status(422).json("plz add all the fields")
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
                console.log(err)
            })
        })

    })
    .catch(err=>{
        console.log(err)
    })
})


router.post('/signin',(req,res)=>{
    const {email,password}= req.body

    if(!email||!password){
        res.status(422).json({error:"plz fill all the fields"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"invalid email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message:"Successfully signed in"})
                const token = jwt.sign({_id:savedUser._id},secret)
                res.json({token})
            }
            else{
                res.status(422).json({error:"Invalid email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})

module.exports = router