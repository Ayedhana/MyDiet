import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { DoctorModel } from "../models/Doctor.js";
import { Router } from "express";


const router = Router();

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "secret", (err) => {
      if (err) return res.sendStatus(403);
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

router.post("/register", async (req, res) => {

  const { email, password, fullName } = req.body;
  
  const user = await DoctorModel.findOne({email});
  if (!user) {
    return res.json({ status: false, message: "Doctor already exists!" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newDoctor = new DoctorModel({
    email,
    password: hashedPassword,
    fullName,
  });
  await newDoctor.save();
  res.json({ message: "Doctor registred successfully" });
});

router.post("/login", async (req, res) => {

  const {email, password } = req.body;
  const doctor = await DoctorModel.findOne({ email });
  if (!doctor) {
    return res. status(401).json({status:false, error: "invalid user or password!Please try again" });
  }

  const isPasswordValid = await bcrypt.compare(password, doctor.password);
  if (!isPasswordValid) {
   return res
      .status(403)
      .json({
        status: false,
        error: "Invalid email or password!Please try again",
      });
  }

  const token = jwt.sign(
    {
      id: doctor._id,
      isBanned: doctor.isBanned,
      isAdmin: doctor.isAdmin,
      isDoctor: doctor.isDoctor,
    },
    "secret"
  );
  res.json({
    token,
    doctorID: doctor._id,
    isDoctor: doctor.isDoctor,
    isBanned: doctor.isBanned,
    isAdmin: doctor.isAdmin,
  });
});
router.get("/savedDiets/:doctorID", async (req, res) => {
  try {
    const doctor = await DoctorModel.findById(req.params.doctorID);

    const savedDiets = await DietModel.find({
      _id: { $in: doctor.savedDiets },
    });

    res.json({ savedDiets });
  } catch (err) {
    res.json({ err });
  }
});
router.get("/savedDiets/ids/:doctorID", async (req, res) => {
  try {
    const doctor=await DoctorModel.findById(req.params.doctorID)

    res.json({ savedDiets:doctor?.savedDiets });
  } catch (err) {
    res.json({ err });
  }
});
router.get("/diets", async (req, res) => {
  try {
    const response = await DietModel.find({});
    res.json(response);
  } catch (err) {
    res.json({ err });
  }
});
router.post("/createDiet", verifyToken, async (req, res) => {
  try {
    const diet = new DietModel(req.body);
    const response = await diet.save();
    res.json(response);
    
  } catch (err) {
    res.json({ err });
  }
});
router.put("/", verifyToken, async (req, res) => {
  try {
    const diet = await DietModel.findById(req.body.dietID);
    const doctor = await DoctorModel.findById(req.body.doctorID);
    doctor.savedDiets.push(diet);
    await doctor.save();
    res.json({ savedDiets: doctor.savedDiets });
  } catch (err) {
    res.json({ err });
  }
});

export { router as doctorRouter };
 

