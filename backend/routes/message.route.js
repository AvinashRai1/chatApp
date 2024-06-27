import express from "express";
import { sendMessages } from "../controllers/message.controller.js"; 
import { protectRoute } from "../middleware/protectRoute.js"; 
import { getMessages } from "../controllers/message.controller.js"; 

const router =express.Router();

router.post("/send/:id", protectRoute,sendMessages);  
router.get("/:id", protectRoute,getMessages);    

export default router;
