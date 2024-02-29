import mongoose from "mongoose";

const ChoreSchema = new mongoose.Schema(
  {
    chore: {
      type: String,
      required: true,
      trim: true
    },
    completed: {
      type: Boolean,
      required: true
    },
    deadline: {
      type: Date,
      required: true
    },
    points: {
      type: Number,
      required: true
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
