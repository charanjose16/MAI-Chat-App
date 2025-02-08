const asyncHandler=require('express-async-handler')
const Message =require("../models/messageModel")
const sendMessage=asyncHandler(async(req,res)=>{
    const {content,chatId}=req.body

    if(!content || !chatId){
        console.log("Invalid content passed into request");
        return res.status(400)
        
    }

    var newMessage={
        sender:req.user._id,
        content:content,
        chat:chatId 
    }

    try {
        var message=await Message.create(newMessage);
        message=await message.populate("sender","name pic").execPopulate();
        message=await message.populate("chat").execPopulate();
    } catch (error) {
        
    }
})
const getMessages=asyncHandler(async(req,res)=>{})

module.exports={sendMessage,getMessages}