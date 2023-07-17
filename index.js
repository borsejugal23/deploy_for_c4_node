const express=require("express");
const { connection } = require("./db");
const { userRouter } = require("./route/user.route");
const { postRouter } = require("./route/post.route");
const app=express();
require("dotenv").config()


app.use(express.json());

app.use("/users",userRouter);
app.use("/post",postRouter)

app.listen(process.env.port,async()=>{
    await connection
    console.log("connected to db")
console.log(`server is listening to ${process.env.port}`)
})
