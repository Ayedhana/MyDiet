import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";
import { Router } from "express";

const router=Router()


router.post("/register", async (req,res)=>{
    const { email, password, fullname } = req.body;
    const user=await UserModel.findOne({email});
    if(user){return res.json({status:false,message:"User already exists!"})}

    const hashedPassword=await bcrypt.hash(password,10)
    const newUser = new UserModel({
      email,
      password: hashedPassword,
      fullname,
    });
    await newUser.save();
    res.json({message:"User registred successfully"})
})

router.post("/login",async (req,res)=>{
 const{email,password}=req.body;
 console.log(req.body)
 const user=await UserModel.findOne({email});
 if(!user){return res.json({message:"User doesn't exist !"})}

 const isPasswordValid= await bcrypt.compare(password,user.password)
 if(!isPasswordValid){res.json({message:"Password or username is incorrect !"})}

 const token=jwt.sign({id:user._id,
                       isUser:user.isUser,
                       isBanned:user.isBanned,
                       isAdmin:user.isAdmin},"secret")
 res.json({
   token,
   userID: user._id,
   isUser: user.isUser,
   isBanned: user.isBanned,
   isAdmin: user.isAdmin,
 });
});


export {router as userRouter};