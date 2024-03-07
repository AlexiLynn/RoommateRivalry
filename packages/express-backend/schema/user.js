import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    points: {
      type: Number,
      default: 0
    },
    householdId: {
      type: mongoose.ObjectId,
      ref: "Household"
    }
  },
  { collection: "User" }
);

const User = mongoose.model("User", UserSchema);

export default User;