const express=require("express");
const { auth } = require("../middleware/auth.middleware");
const { postModel } = require("../model/post.model");
const postRouter=express.Router();

postRouter.post("/add",auth,async(req,res)=>{
  try {
    const newpost= new postModel(req.body);
    await newpost.save();
    return res.status(200).json({msg:"new post added"})
  } catch (error) {
    res.status(500).json({error:error.message})

  }
})

 postRouter.get("/", auth, async (req, res) => {
    try {
       console.log(req.body.username);
       const loggedInUserPost = await postModel.find({ username: req.body.username });
       return res.status(200).json({ loggedInUserPost: loggedInUserPost });
    } catch (error) {
       return res.status(500).json({ error: error.message });
    }
 });

 postRouter.get("/search", async (req, res) => {
    try {
       const { device1, device2 } = req.query;
       let filter = {};
 
       if (device1 && device2) {
          filter = { $or: [{ device: device1 }, { device: device2 }] };
       } 
       else if (device1) {
          filter = { device: device1 };
       }
 
       const searchpost = await postModel.find(filter);
       res.send({ searchpost: searchpost });
       
    } catch (error) {
       res.status(500).json({ msg: 'something went wrong' });
    }
 });
 
 
 postRouter.patch("/update/:postID", auth,async (req, res) => {
    const userIDinUserDoc = req.body.creator;
    try {
      const { postID } = req.params;

      const post = await postModel.findById({_id:postID});

      let userIDinpostDoc = post.creator;

      if (userIDinpostDoc === userIDinUserDoc) {

        await postModel.findByIdAndUpdate({_id:postID}, req.body);
        res.json({ msg: "post updated" });

      }
       else {

        res.json({ msg: "Not authorized" });
      }
    } 
    catch (error) {
      res.json({ error: error.message });
    }
});
  
postRouter.delete("/delete/:postID",auth,async(req,res)=>{
    const userIDinUserDoc = req.body.creator;
    try {
      const { postID } = req.params;

      const post = await postModel.findById({_id:postID});

      let userIDinpostDoc = post.creator;

      if (userIDinpostDoc === userIDinUserDoc) {

        await postModel.findByIdAndDelete({_id:postID});
        res.json({ msg: "post deleted" });

      }
       else {
        res.json({ msg: "Not authorized" });
      }
    } catch (error) {
      res.json({ error: error.message });
    }
});


module.exports={postRouter}