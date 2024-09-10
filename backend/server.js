import express from 'express'; // esmodule
import authRoutes from "./routes/auth.js";
import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';

const app = express();
const PORT = ENV_VARS.PORT

app.use(express.json()); // will allow parsing req.body object

app.use("/api/v1/auth", authRoutes)

app.listen(PORT, () => {
  console.log("server started at http://localhost:" + PORT); 
  connectDB()
})
