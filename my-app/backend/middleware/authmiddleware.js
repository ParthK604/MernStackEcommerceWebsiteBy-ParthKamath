import jwt from "jsonwebtoken";
const secret=process.env.JWT_SECRET || "devs_secret";

export default function authmiddleware(req,res,next){
   const token=req.cookies?.token
   if(!token) return res.status(401).json({message:"not authenticated"});
   try {
    const decoded=jwt.verify(token,secret);
    req.userId=decoded.id;
    next();
   } catch (error) {
    return res.status(401).json({message:"invalid or expired token"});
   }
}