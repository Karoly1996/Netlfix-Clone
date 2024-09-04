import express from 'express'; // esmodule
import authRoutes from "./routes/auth.js";
import dotenv from "dotenv"

dotenv.config();

const app = express();

app.use("/api/v1/auth", authRoutes)

app.listen(5001, () => {
  console.log('server started at http://localhost:5001'); 
})

