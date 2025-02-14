const mongoose=require("mongoose");

const messageModel=mongoose.Schema({
    sender:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    content:{type:String},
    chat:{type:mongoose.Schema.Types.ObjectId,ref:"Chat"},
   
},
{
    timpestamps:true
})

const Message=mongoose.model("Message",messageModel);
module.exports=Message;