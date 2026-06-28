const express=require("express");
const router=express.Router();
const protect=require("../middleware/authMiddleware");
const { createChat,getChats } = require("../controllers/chatController");

router.post("/",protect,createChat);
router.get("/" ,protect,getChats);
module.exports=router;