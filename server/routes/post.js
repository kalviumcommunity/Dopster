const express= require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model('Post')

router.get('/allprojects',(req,res)=>{
    Post.find()
    .populate('postedBy',"_id name")
    .then(posts=>{
        
        res.json({posts})

    })
    .catch(err=>{
        console.log(err)
        res.status(501).json({error:err.message})
    })
})

router.post('/createproject',requireLogin,(req,res)=>{
    const{title,description,link,photo}= req.body
    if(!title ||!description||!link||!photo){
        return res.status(422).json({error:"plz add all the fields"})
    }
    console.log(req.user)
    module.exports=req.user
    if(req?.user?.password){
        req.user.password=undefined;
    }
    


    const post = new Post ({
        title,
        body:description,
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
router.put('/like',requireLogin,(req,res)=>{
    // console.log("this is user:"+req.user)
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).populate("postedBy","_id name").exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else{
            res.json(result)
        }
    })
    

})
router.put('/dislike',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        
        $pull:{likes:req.user._id}
    },{
        new:true
    }).populate("postedBy","_id name").exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else{
            res.json(result)
        }
    })
    

})

router.get('/project/:id',(req,res)=>{
    Post.findOne({_id:req.params.id})
    .then(project=>{
        res.json(project)
    })
    .catch(err=>{
        return res.status(404).json({error:"Project not found"})
    })
})
module.exports= router
