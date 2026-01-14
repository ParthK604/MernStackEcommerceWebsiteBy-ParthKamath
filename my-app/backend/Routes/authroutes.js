import express from "express";
import User from "../Models/User.js";
import { handlelogin,handlesignup } from "../controller/authcontroller.js";
import authmiddleware from "../middleware/authmiddleware.js";
const router=express.Router();
router.post("/signup",handlesignup);
router.post("/login",handlelogin);
router.get("/me", authmiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-pass -__v");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
router.post("/logout",(req,res)=>{
  res.clearCookie("token");
  res.status(200).json({message:"logout successfull"});
})
export default router;
