import mongoose from "mongoose";
import dotenv from "dotenv";
import householdModel from "./schema/household.js";
import userModel from "./schema/user.js";
import choreModel from "./schema/chore.js";

mongoose.set("debug", true);
dotenv.config();
//const uri = process.env.MONGODB_URI;
// Hard code the uri for jest testing
const uri =
  "mongodb+srv://admin:Landlord404@roommarterivalry.ckbmvrb.mongodb.net/?retryWrites=true&w=majority&appName=RoommateRivalry";

/* istanbul ignore next */
mongoose
  .connect(uri, { dbName: "RoomieData" })
  .catch((error) => console.log(error));

//HOUSEHOLD SERVICES

function findHouseholdByID(householdId) {
  return householdModel.findById(householdId);
}

function findHouseholdByGroupName(groupName) {
  return householdModel.findOne({ groupname: groupName });
}

function addHousehold(home) {
  const homeToAdd = new householdModel(home);
  const promise = homeToAdd.save();
  return promise;
}

function deleteHousehold(householdId) {
  return householdModel.findByIdAndDelete(householdId);
}

//USER SERVICES

function findUserById(userId) {
  return userModel.findById(userId);
}

function findUsersByHouseholdId(householdId) {
  return userModel.find({ householdId: householdId });
}

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

function updateUser(userId, user) {
  return userModel.findByIdAndUpdate(userId, user);
}

function deleteUser(userId) {
  return userModel.findByIdAndDelete(userId);
}

function findUserByEmail(email) {
  return userModel.find({ email: email });
}

//CHORE SERVICES

function addChore(chore) {
  const choreToAdd = new choreModel(chore);
  const promise = choreToAdd.save();
  return promise;
}

function findChoreById(choreId) {
  return choreModel.findById(choreId);
}

function findChoresByHouseholdId(householdId) {
  return choreModel.find({ householdId: householdId });
}

function findChoresByUserId(userId) {
  return choreModel.find({ userId: userId });
}

function updateChore(choreId, chore) {
  return choreModel.findByIdAndUpdate(choreId, chore);
}

function deleteChore(choreId) {
  return choreModel.findByIdAndDelete(choreId);
}

export default {
  findHouseholdByID,
  findHouseholdByGroupName,
  addHousehold,
  deleteHousehold,
  findUserById,
  findUsersByHouseholdId,
  addUser,
  updateUser,
  deleteUser,
  findUserByEmail,
  addChore,
  findChoreById,
  findChoresByHouseholdId,
  findChoresByUserId,
  updateChore,
  deleteChore
};
