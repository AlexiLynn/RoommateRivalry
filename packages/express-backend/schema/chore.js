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
    household: {
      type: mongoose.ObjectId,
      ref: "Household"
    }
  },
  { collection: "Chore" }
);

const Chore = mongoose.model("Chore", ChoreSchema);

export default Chore;
