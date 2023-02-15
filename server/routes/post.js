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
    })
})

router.post('/createproject',requireLogin,(req,res)=>{
    const{title,body,link}= req.body
    if(!title ||!body||!link){
        return res.status(422).json({error:"plz add all the fields"})
    }

    req.user.password=undefined;


    const post = new Post ({
        title,
        body,
        link,
        postedBy:req.user
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
console.log(err)
    })
})

module.exports= router