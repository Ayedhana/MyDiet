import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  email: {
    type: "String",
    required: "true",
    unique: "true",
  },
  fullName: {
    type: "String",
    required: "true",
  },

  password: {
    type: "String",
    required: true,
    minLength: 8,
  },
  imageUrl: {
    type: "String",
  },
  savedDiets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "diets",
    },
  ],
  isDoctor: {
    type: Boolean,
    default: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
});
export const DoctorModel = mongoose.model("doctors", DoctorSchema);
