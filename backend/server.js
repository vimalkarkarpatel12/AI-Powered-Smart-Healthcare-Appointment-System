import express from "express";
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongoDB.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/AdminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";
import chatbotRouter from "./routes/chatbotRoute.js";
import reminderRouter from "./routes/reminderRoute.js";

// app config
const app = express();
const PORT = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json());
app.use(cors());

// api endpoint
app.use('/api/admin', adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user', userRouter)
app.use("/api/chatbot", chatbotRouter);
app.use("/api/reminder", reminderRouter);

app.get("/", (req, res) =>{
    res.send('API WORKING vimal')
})

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

