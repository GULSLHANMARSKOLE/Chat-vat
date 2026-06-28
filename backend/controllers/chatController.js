const Chat=require("../models/Chat");

const createChat=async(req,res)=>{
    try{
        const {userId}=req.body;
        if(!userId){
            return res.status(400).json({
                message:"User ID is required.",
            });
        }
        const existingChat=await Chat.findOne({
            participants:{
                $all:[req.user._id,userId],
            },
        });

        if(existingChat){
            return res.status(200).json(existingChat);
        }
        const chat=await Chat.create({
            participants:[req.user._id,userId],
        });
        return res.status(201).json(chat);
    }catch(error){
        return res.status(500).json({
            message:"Internal Server Error",
        });
    }

};
const getChats=async(req,res)=>{
   try{
     const chat=await Chat.find({
        participants:req.user._id,
    }).populate("participants","-password").sort({updatedAt:-1});
    return res.status(200).json({
        chat,
    });
   }catch(error){
    console.log(error);
    return res.status(500).json({
        message:"Internal Server Error",
    });
   }
}
module.exports={
    createChat,
    getChats,
};