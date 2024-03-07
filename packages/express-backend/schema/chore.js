import mongoose from "mongoose";

const ChoreSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true
    },
    deadline: {
      type: Date,
      required: true
    },
    points: {
      type: Number,
      required: true
    },
    assignee: {
      type: String,
      required: true,
      trim: true
    },
    householdId: {
      type: mongoose.ObjectId,
      ref: "Household"
    },
    userId: {
      type: mongoose.ObjectId,
      ref: "User"
    }
  },
  { collection: "Chore" }
);

const Chore = mongoose.model("Chore", ChoreSchema);

export default Chore;
