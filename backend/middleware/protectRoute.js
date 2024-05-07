import jwt from "jsonwebtoken";
import User from "../models/user.model.js"; 

export const protectRoute=async(req,res,next)=>{
    try {
        console.log("high"); 
        const token=req.cookies.jwt; 
        console.log(token); 

          if(!token){
            return res.status(401).json({
                error:"No token provided"
            }) 
          }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({
                error:"Unauthorised Invalid token"  
            }) 
        }
        const user= await User.findById(decoded.userId).select("-password");
        if(!user){ 
            return res.status(401).json({ 
                error:"No user present "
            }) 
        }
        req.user=user; 
        next(); 
    } catch (error) {
        console.log("error in protected route",error.message);  
        return res.status(500).json({
            error:"Internal Server error"
        })
    }
}

