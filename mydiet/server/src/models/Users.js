import mongoose from "mongoose";
 
const UserSchema = new mongoose.Schema({
  email: {
    type: "String",
    required: "true",
    unique: "true",
  },
  fullname: {
    type: "String",
    required: "true",
  },

  password: {
    type: "String",
    required: true,
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
  isUser: {
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
 export const UserModel = mongoose.model("users", UserSchema);