import mongoose from "mongoose";
const userschema=new mongoose.Schema({
   fname:String,
   lname:String,
   email:String,
   phno:Number,
   age:Number,
   gender:String,
   pass:String,
   usern:String,
});
export default mongoose.model("Users",userschema);