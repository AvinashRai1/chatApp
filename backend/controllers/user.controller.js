import User from "../models/user.model.js"

export  const getUsersForSidebar =async(req,res)=>{
     try {
        const loggedInUserId=req.user._id;
        const filterUsers= await User.find({_id:{$ne:loggedInUserId}});
        res.status(200).json(filterUsers);  
     } catch (error) {
        console.log(error.message) 
         return res.status(500).json({ 

            success:false,
            error:'Error in the getUserSidebar'
         })
     }
}