const User = require("../models/User");
const searchUsers = async (req, res) => {
  try {
    console.log("Controller Started");
    const search=req.query.search || "";
    const users=await User.find({
        name:{
            $regex:search,
            $options:"i",
        },
        _id:{
            $ne:req.user._id,
        },
    }).select("-password");
    console.log("Users:",users);
    return res.status(200).json({
        users,
    })
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  searchUsers,
};
