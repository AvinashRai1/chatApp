import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();  

const connectToMongoDb= async()=>{
     try { 
       await  mongoose.connect(process.env.MONGODB_URL);
       console.log("connection succesfull hurray");  
     } catch (error) { 
        console.log("error in connectong to database",error.message);
     }
}

export default connectToMongoDb;  
