import mongoose from "mongoose";
import dotenv from "dotenv";
import householdModel from "./schema/household.js";
import userModel from "./schema/user.js";
import choreModel from "./schema/chore.js";

mongoose.set("debug", true);
dotenv.config();
const uri = process.env.MONGODB_URI;


mongoose
  .connect(uri, {dbName: "RoomieData"})
  .catch((error) => console.log(error));

//HOUSEHOLD SERVICES

function getHousehold() {
  let promise;
  promise = householdModel.find();
  return promise;
}

function findHouseholdByID(id){
  return householdModel.findById(id)
}

function addHousehold(home) {
  const homeToAdd = new householdModel(home);
  const promise = homeToAdd.save();
  return promise;
}

function deleteHousehold(id) {
  return householdModel.findByIdAndDelete(id);
}

//USER SERVICES

function getUsers() {
  let promise;
  promise = userModel.find();
  return promise;
}

function findUsersById(id) {
  return userModel.findById(id)
}

function findUsersByHouseholdId(id) {
  return userModel.find({ householdId: householdId })
}

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

function deleteUser(id) {
  return userModel.findByIdAndDelete(id);
}

//CHORE SERVICES

function getChores() {
  let promise;
  promise = choreModel.find();
  return promise;
}

function addChore(home) {
  const choreToAdd = new choreModel(home);
  const promise = choreToAdd.save();
  return promise;
}

function findChoresByHouseholdId(householdId) {
  return choreModel.find({ householdId: householdId })
}

function findChoresByUserId(userId) {
  return choreModel.find({ userId: userId})
}

function deleteChore(id) {
  return choreModel.findByIdAndDelete(id);
}

export default {
  getHousehold,
  findHouseholdByID,
  addHousehold,
  getUsers,
  findUsersById,
  findUsersByHouseholdId,
  addUser,
  deleteUser,
  getChores,
  findChoresByHouseholdId,
  findChoresByUserId,
  addChore,
  deleteChore
};
