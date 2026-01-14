import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import authRoutes from "./Routes/authroutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import orderRoutes from "./Routes/orderroutes.js";


const app = express()
const port = 3000

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/api/orders",orderRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB Connected Successfully"))
  .catch((err) => console.log(" MongoDB Connection Error:", err));


console.log("JWT_SECRET from server:", process.env.JWT_SECRET);


  app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})