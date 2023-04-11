const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Post = mongoose.model("Post");
const User = mongoose.model("User");
router.get("/allprojects", (req, res) => {
  Post.find()
    .populate("postedBy", "_id name")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
      res.status(501).json({ error: err.message });
    });
});

router.post("/createproject", requireLogin, async (req, res) => {
  const { title, description, link, photo } = req.body;
  if (!title || !description || !link || !photo) {
    return res.status(422).json({ error: "plz add all the fields" });
  }

  if (req.user?.password) {
    req.user.password = undefined;
  }
  const userdata = await User.findOne({ _id: req.user._id });
  const update = await User.findByIdAndUpdate(
    { _id: userdata._id },
    { dopeCredits: userdata.dopeCredits + 1 },
    { new: true }
  );

  const post = new Post({
    title,
    body: description,
    photo,
    link,
    postedBy: req.user,
  });
  post
    .save()
    .then((result) => {
      res.json({ post: result, update });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
});

router.get("/myprojects", requireLogin, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .then((myproject) => {
      res.json({ myproject });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.put("/like", requireLogin, (req, res) => {
  // console.log("this is user:"+req.user)
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    {
      new: true,
    }
  )
    .populate("postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});
router.put("/dislike", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    }
  )
    .populate("postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.put("/comment", requireLogin, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .populate("postedBy", "name")
    .populate("comments.postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.get("/project/:id", async (req, res) => {
  const findProject = await Post.findOne({ _id: req.params.id })
    .populate("postedBy", " _id name")
    .populate("comments.postedBy", "_id name");
  if (!findProject) {
    return res.status(404).json({ error: "No project found" });
  }
  const id = findProject.postedBy._id;
  const allprojects = await Post.find({ postedBy: id }).populate(
    "postedBy",
    "_id name"
  );
 

  res.status(200).json({ findProject, allprojects });
});

router.post("/like-details", async (req, res) => {
  const { likes } = req.body;
  console.log(likes);
  const userdetails = [];
  for (i = 0; i < likes.length; i++) {
    const user = await User.findById(likes[i]);
    userdetails.push(user.name);
  }
  res.status(200).json({ userdetails });
  console.log(userdetails);
});

router.post("/userprojects", (req, res) => {
  const { id } = req.body;
  console.log(id);
  Post.find({ postedBy: id })
    .populate("postedBy", "_id name")
    // Post.aggregate(
    //     {
    //         $match:{postedBy:id}
    //     }
    // )
    .then((projects) => {
      console.log(projects);
      res.send(projects);
    });
});
module.exports = router;
