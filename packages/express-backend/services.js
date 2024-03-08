import mongoose from "mongoose";
import dotenv from "dotenv";
import householdModel from "./schema/household.js";
import userModel from "./schema/user.js";
import choreModel from "./schema/chore.js";

mongoose.set("debug", true);
dotenv.config();
const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri, { dbName: "RoomieData" })
  .catch((error) => console.log(error));

//HOUSEHOLD SERVICES

function getHousehold() {
  let promise;
  promise = householdModel.find();
  return promise;
}

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

function getUsers() {
  let promise;
  promise = userModel.find();
  return promise;
}

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

function updateUser(userId, user){
  return userModel.findByIdAndUpdate(userId, user);
}

function deleteUser(userId) {
  return userModel.findByIdAndDelete(userId);
}

function findUserByEmail(email) {
  return userModel.find({ email: email });
}

//CHORE SERVICES

function getChores() {
  let promise;
  promise = choreModel.find();
  return promise;
}

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

function updateChore(choreId, chore){
  return choreModel.findByIdAndUpdate(choreId, chore)
}

function deleteChore(choreId) {
  return choreModel.findByIdAndDelete(choreId);
}

//to get user name with each chore
async function findChoresByUserIdWithUserDetails(userId) {
  const chores = await choreModel.find({ userId: userId });

  const choresWithUserDetails = await Promise.all(
    chores.map(async (chore) => {
      const user = await userModel.findById(chore.userId, 'name');
      return { ...chore.toObject(), user };  // Convert Mongoose document to plain object
    })
  );

  return choresWithUserDetails;
}

export default {
  getHousehold,
  findHouseholdByID,
  findHouseholdByGroupName,
  addHousehold,
  deleteHousehold,
  getUsers,
  findUserById,
  findUsersByHouseholdId,
  addUser,
  updateUser,
  deleteUser,
  findUserByEmail,
  getChores,
  findChoresByHouseholdId,
  findChoreById,
  addChore,
  updateChore,
  deleteChore,
  findChoresByUserId,
  findChoresByUserIdWithUserDetails
};
