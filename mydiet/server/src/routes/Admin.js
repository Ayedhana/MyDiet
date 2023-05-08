import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";
import { Router } from "express";
const router = Router();
import { DoctorModel } from "../models/Doctor.js";
const verifyToken = (req, res, next) => {
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


router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.json({ message: "User doesn't exist !" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    res.json({ message: "Password or username is incorrect !" });
  }

  const token = jwt.sign(
    {
      id: user._id,
      isUser: user.isUser,
      isBanned: user.isBanned,
      isAdmin: user.isAdmin,
    },
    "secret"
  );
  res.json({
    token,
    userID: user._id,
    isUser: user.isUser,
    isBanned: user.isBanned,
    isAdmin: user.isAdmin,
  });
});
router.get("/Users", verifyToken, async (req, res) => {
  try {
    const users = await UserModel.find().select({ password: 0, email: 0 });
    res
      .status(200)
      .json({ status: true, message: "All Profiles", data: users });
  } catch (error) {
    if (error) throw error;
    res.status(500).json({ error });
  }
});
router.get("/Doctors", verifyToken, async (req, res) => {
  try {
    const users = await DoctorModel.find().select({ password: 0, email: 0 });
    res
      .status(200)
      .json({ status: true, message: "All Profiles", data: users });
  } catch (error) {
    if (error) throw error;
    res.status(500).json({ error });
  }
});
router.put("/bannUser/:id", verifyToken, async (req, res) => {
  try {
    let { id } = req.params;
    const bannedUser = await UserModel.findByIdAndUpdate(
      id,
      { $set: { isBanned: true } },
      { new: true }
    );
    res
      .status(200)
      .json({ status: true, message: "User was banned", data: bannedUser });
  } catch (error) {
    if (error) throw error;
    res.status(500).json({ starus: false, error });
  }
});
router.put("/bannDoctor/:id", verifyToken, async (req, res) => {
  try {
    let { id } = req.params;
    const bannedUser = await DoctorModel.findByIdAndUpdate(
      id,
      { $set: { isBanned: true } },
      { new: true }
    );
    res
      .status(200)
      .json({ status: true, message: "User was banned", data: bannedUser });
  } catch (error) {
    if (error) throw error;
    res.status(500).json({ starus: false, error });
  }
});







export { router as adminRouter };

