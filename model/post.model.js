const mongoose=require("mongoose");

const postSchema=mongoose.Schema(
    {
        title:String,
        body:String,
        device:String,
        creator:String,
        username:String
    },
    {
        versionKey:false
    }
)

const postModel=mongoose.model("post",postSchema);

module.exports={postModel}


// name ==> String
// email ==> String
// gender ==> String
// password ==> String