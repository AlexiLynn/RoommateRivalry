import mongoose from "mongoose";

const HouseholdSchema = new mongoose.Schema(
  {
    groupname: {
      type: String,
      required: true,
      trim: true
    },
    roommates: [
      {
        type: mongoose.ObjectId,
        ref: "User"
      }
    ]
  },
  { collection: "Household" }
);

const Household = mongoose.model("Household", HouseholdSchema);

export default Household;
