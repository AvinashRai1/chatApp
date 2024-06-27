
import express from "express";
import dotenv from "dotenv";
import { app,server } from "./socket/socket.js"; 

import authRoutes from "./routes/auth.route.js"; 
import messageRoutes from "./routes/message.route.js";  
import userRoutes from "./routes/user.route.js";    


import connectToMongoDb from "./db/connectToMongoDB.js";
import cookieParser from "cookie-parser";


dotenv.config(); 
const PORT=process.env.PORT || 8000;     
connectToMongoDb(); 


app.use(express.json());  
app.use(cookieParser()); 


 
app.get("/",(req,res)=>{ 
  res.send("hello india lets chat");     
})
app.use("/api/auth",authRoutes);  
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);

server.listen(PORT,()=>console.log(`app is running smoothly ${PORT}`));        

