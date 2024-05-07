import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js"; 
export const sendMessages=async(req,res)=>{
    try {
        const{message}=req.body;
        const senderId = req.user._id;
        const {id:recieverId}=req.params;

        let conversation=await Conversation.findOne({
            participants:{$all:[senderId,recieverId]}
        })

        if(!conversation){
         conversation=await  Conversation.create({ 
              participants:[senderId,recieverId],
            })
        } 

        const newMessage=await Message.create({  
            senderId,
            recieverId,
            message
        });

        if(newMessage){
            conversation.messages.push(newMessage._id);  
        } 
       await conversation.save(); 
          
        res.status(200).json(newMessage); 




    } catch (error) {
        console.log("error in send message controller",error.message);
        return res.status(500).json({
            success:false,
            error:'Internal Server Error'


        }) 
    }
} 

export const getMessages=async(req,res)=>{
    try {
          const {id:userToChatId}=req.params; 
          const senderId=req.user._id;
          console.log(senderId);
          console.log(userToChatId); 

        const conversation= await Conversation.findOne({
            participants:{$all:[senderId,userToChatId]} 
        }).populate("messages");

        res.status(200).json(conversation.messages);    
    } catch (error) {
        console.log("error in get message controller",error.message);
        return res.status(500).json({
            success:false,
            error:'Internal Server Error'


        })
    }
}