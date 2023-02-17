const express = require('express')
const router = express.Router()

require('dotenv').config()

const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt  = require('jsonwebtoken')
const secret = process.env.SECRET



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
            res.status(400).json({error:err.message})
        })
    })
})

module.exports = router
