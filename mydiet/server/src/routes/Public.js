import express from 'express';
import { DietModel } from '../models/Diet.js';
import { Router } from "express";
const router = Router();

router.get("/diets", async (req, res) => {
  try {
    const response = await DietModel.find({});
    res.json(response);
  } catch (err) {
    res.json({ err });
  }
});

export { router as publicRouter };
