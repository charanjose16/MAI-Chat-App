const express = require("express");
const dotenv=require("dotenv");
const {chats}=require("./data/data");
const connectDB = require("./config/db");
const app = express();

dotenv.config();
connectDB();

app.get("/", (req, res) => {
  res.send("Api is running succesfully");
});

app.get("/api/chats", (req, res) => {
  res.send(chats);
});

app.get("/api/chat/:id",(req,res)=>{
    const singleChat=chats.find((c)=>c._id === req.params.id)
    res.send(singleChat);
    
})

const port= process.env.PORT || 5000;

app.listen(port, console.log(`Server is running on port ${port}`));
