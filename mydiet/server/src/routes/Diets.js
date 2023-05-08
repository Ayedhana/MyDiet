import express from "express";
import { DietModel } from "../models/Diet.js";
import { DoctorModel } from "../models/Doctor.js";
import { verifyToken } from "./Doctors.js";


const router=express.Router();
router.get("/",async(req,res)=>{
    try {
        const response=await DietModel.find({});
        res.json(response)
        
    } catch (err) {
        res.json({err})
    }
})
router.get("/doctor/diets", async (req, res) => {
  try {
    const response = await DietModel.find({});
    res.json(response);
  } catch (err) {
    res.json({ err });
  }
});
router.post("/",verifyToken, async (req, res) => {
  try {
    const diet=new DietModel(req.body)
    const response=await diet.save()
    res.json(response)
  } catch (err) {
    res.json({ err });
  }
});
router.put("/",verifyToken, async(req,res)=>{
    try {
    const diet=await DietModel.findById(req.body.dietID);
    const doctor=await DoctorModel.findById(req.body.doctorID);
    doctor.savedDiets.push(diet);
    await doctor.save();
    res.json({savedDiets:doctor.savedDiets})
    } catch (err) {
      res.json({ err });
    }
})
router.get("/savedDiets/ids/:doctorID", async (req, res) => {
  try {
    const doctor=await DoctorModel.findById(req.params.doctorID)

    res.json({ savedDiets:doctor?.savedDiets });
  } catch (err) {
    res.json({ err });
  }
});
router.get("/savedDiets/:doctorID", async (req, res) => {
  try {
    const doctor = await DoctorModel.findById(req.params.doctorID);

    const savedDiets = await DietModel.find({_id: { $in: doctor.savedDiets },
    });

    res.json({ savedDiets });
  } catch (err) {
    res.json({ err });
  }
});




export {router as dietsRouter}