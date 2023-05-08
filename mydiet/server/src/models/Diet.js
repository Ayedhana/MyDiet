import mongoose from "mongoose";
 
const DietSchema = new mongoose.Schema({
  name: {
    type: "String",
    required: "true",
  },
  breakfast: [
    {
      type: String,
      required: true,
    },
  ],
  lunch: [
    {
      type: String,
      required: true,
    },
  ],
  dinner: [
    {
      type: String,
      required: true,
    },
  ],

  DailyTotalsCaloris: [
    {
      type: String,
      required: true,
    },
  ],

  imageUrl: {
    type: String,
    required: true,
  },
  doctorOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctors",
    required: true,
  },
});
 export const DietModel = mongoose.model("diets", DietSchema);