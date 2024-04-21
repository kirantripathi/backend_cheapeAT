import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

import MyUserRoute from "./routes/MyUserRoute"



mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log("Connected to database!"));

const app = express();

app.use(cors());

app.use(express.json());


app.get("/health",async (req:Request,res:Response) => {
  res.send({message:"hello world"})
})



app.use("/api/my/user",MyUserRoute)
    

app.listen(3001, () => {
    console.log("server started on localhost:3001");
  });