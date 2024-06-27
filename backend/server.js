import path from "path";
import express from "express";
import dotenv from "dotenv";
import { app,server } from "./socket/socket.js"; 

import authRoutes from "./routes/auth.route.js"; 
import messageRoutes from "./routes/message.route.js";  
import userRoutes from "./routes/user.route.js";    


import connectToMongoDb from "./db/connectToMongoDB.js"; 
import cookieParser from "cookie-parser";


dotenv.config(); 
const __dirname = path.resolve(); 
const PORT=process.env.PORT || 5000;       



app.use(express.json());  
app.use(cookieParser());   


 

app.use("/api/auth",authRoutes);  
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);
app.use(express.static(path.join(__dirname, "/frontend/dist"))); 

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
}); 

server.listen(PORT,()=>{
  connectToMongoDb();   
  console.log(`app is running smoothly ${PORT}`)
});        

