import mongoose from "mongoose";
import dotenv from 'dotenv';
import householdModel from "./schema/household.js";
import userModel from "./schema/user.js";
import choreModel from "./schema/chore.js";

mongoose.set("debug", true);
dotenv.config();
const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri, {
    dbName: `RoomieData`,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));


//HOUSEHOLD SERVICES

function getHousehold(){
    let promise;
    promise = householdModel.find();
    return promise;
}

function addHousehold(home){
    const homeToAdd = new householdModel(home);
    const promise = homeToAdd.save();
    return promise;
}


//USER SERVICES

function getUsers(){
    let promise;
    promise = userModel.find();
    return promise;
}

function addUser(user){
    const userToAdd = new userModel(user);
    const promise = userToAdd.save();
    return promise;
}


//CHORE SERVICES

function getChores(){
    let promise;
    promise = choreModel.find();
    return promise;
}

function addChore(home){
    const choreToAdd = new choreModel(home);
    const promise = choreToAdd.save();
    return promise;
}


export default {
    getHousehold,
    addHousehold,
    getUsers,
    addUser,
    getChores,
    addChore,
};
