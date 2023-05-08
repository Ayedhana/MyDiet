import express from "express";
import cors from "cors";
import mongoose from "mongoose";
const DBUSER = "hana";
const DBPSWD = "hana";
import {userRouter} from "./routes/Users.js"
import {doctorRouter} from "./routes/Doctors.js"
import { dietsRouter } from "./routes/Diets.js";
import { adminRouter } from "./routes/Admin.js";
import { publicRouter } from "./routes/Public.js";

const app=express();
app.use(express.json());
app.use(cors());

 //app
  app.use("/auth", userRouter);
  app.use("/authDoctor", doctorRouter);
   app.use("/diets", dietsRouter);
  app.use("/doctor/createDiet", dietsRouter);
  app.use("/admin", adminRouter);
  app.use("/public", publicRouter);
  app.use("/doctor/diets", dietsRouter);

mongoose
  .connect(
    `mongodb+srv://${DBUSER}:${DBPSWD}@cluster0.0we9avw.mongodb.net/MyNutritionist?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )

  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

 


app.listen(3001,()=>{console.log("SERVER STARTED")})
