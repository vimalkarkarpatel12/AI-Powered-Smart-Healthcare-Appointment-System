import express from "express";
import { chatbotHandler } from "../controllers/chatbotController.js";

const chatbotRouter = express.Router();

chatbotRouter.post("/chat", chatbotHandler);

export default chatbotRouter;