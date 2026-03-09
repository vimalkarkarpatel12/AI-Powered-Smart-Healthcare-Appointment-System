import express from "express";
import { addReminder } from "../controllers/reminderController.js";

const reminderRouter = express.Router();

reminderRouter.post("/add", addReminder);

export default reminderRouter;