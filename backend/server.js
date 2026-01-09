import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", chatRoutes);



const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
};

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});



