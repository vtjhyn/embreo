import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from './routes/authRoute.js'
import eventRoute from './routes/eventRoute.js'


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(authRoute);
app.use(eventRoute);


app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running...");
});
