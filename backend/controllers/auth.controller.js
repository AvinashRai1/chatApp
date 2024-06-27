import User from "../models/user.model.js"; 
import bcrypt from "bcryptjs";
import genrateTokenAndSetCookie from "../utils/genrateToken.js";
export const signup=async(req,res)=>{
 
  try {
    const{fullName,userName,password,confirmPassword,gender}=req.body;
    if(password!==confirmPassword){
        return res.status(401).json({
            success:false,
            error:"password do not match"
        }) 
    }

    const user=await User.findOne({userName});
    if(user){
        return res.status(401).json({
            success:false,
            error:"UserName alredy exsists"  
        })
    }
    //hashing
    const salt = await bcrypt.genSalt(10);
    const hashPassword= await bcrypt.hash(password,salt); 



    const boyProfilePic=`https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePic=`https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const newUser= await User.create({  
        fullName,
        userName,
        gender,
        password:hashPassword, 
        profilePic:gender==="Male"? (boyProfilePic):(girlProfilePic)
    });
             
  

   if(newUser){
     
     // await newUser.save(); 
     genrateTokenAndSetCookie(newUser._id,res);  
    return res.status(201).json({
        _id:newUser._id,
        fullName:newUser.fullName, 
        userName:newUser.userName, 
        profilePic:newUser.profilePic
 
 
     })
   }
   else{
    res.status(400).json({
        error:"Invalid data"
    }) 
   }

    


  } catch (error) {
    console.log("error occured in signup ",error); 
    return res.status(500).json({
        success:false,
        error:"Internal server error" 
       

 
 
     })
  }
}



export const login=async(req,res)=>{ 
        
   try {
    
      const{userName,password}=req.body;
      
      const user= await User.findOne({userName});
     
      const isPasswordCorrect=await bcrypt.compare(password,user?.password || ""); 
      if(!user || !isPasswordCorrect){
        return res.status(400).json({
            success:false,
            error:"invalid username or Password"
        })
      }
       genrateTokenAndSetCookie(user._id,res);  
      res.status(200).json({ 
        _id:user._id, 
        fullName:user.fullName,
        userName:user.userName,
        profilePic:user.profilePic 

      })

   } catch (error) {
    console.log("errror while login in",error.message);
    return res.status(500).json({
        success:false,
        error:"Internal server error" 
    })
   }
} 

export const logout=async(req,res)=>{
   try {
      res.cookie("jwt","",{maxAge:0});  
      res.status(200).json({
        message:"logged out succesfully"
     })

   } catch (error) {
    res.status(200).json({
        message:"failed to log out"  
     })
   }
}
// https://avatar.iran.liara.run/public/boy

