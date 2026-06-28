const express=require("express")
const protect=require("../middleware/authMiddleware")
const router=express.Router();
const  {registerUser,loginUser,getMe ,logoutUser} =require("../controllers/authController");

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/me",protect,getMe);
router.post("/logout",logoutUser);
module.exports=router;