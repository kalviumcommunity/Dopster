const express= require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model('Post')

router.get('/allprojects',(req,res)=>{
    Post.find()
    .populate('postedBy',"_id name email")
    .then(posts=>{
        
        res.json({posts})

    })
    .catch(err=>{
        console.log(err)
        res.status(501).json({error:err.message})
    })
})

router.post('/createproject',requireLogin,(req,res)=>{
    const{title,body,link,photo}= req.body
    if(!title ||!body||!link||!photo){
        return res.status(422).json({error:"plz add all the fields"})
    }

    req.user.password=undefined;


    const post = new Post ({
        title,
        body,
        photo,
        link,
        postedBy:req.user
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
res.status(400).json({error:err.message})
    })
})

router.get('/myprojects',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate('postedBy',"_id name")
    .then(myproject=>{
        res.json({myproject})
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports= router
