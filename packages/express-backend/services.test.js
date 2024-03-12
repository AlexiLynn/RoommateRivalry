import mut from "./services.js";
import { test, expect } from "@jest/globals";

//Household Tests

test("test findHouseholdByID", async () => {
  const id = "65f0dbf51f6b44a06ac74021";
  const res = await mut.findHouseholdByID(id);
  expect(res.groupname).toBe("BIG BACKEND");
});

test("test findHouseholdByGroupName", async () => {
  const name = "BIG BACKEND";
  const res = await mut.findHouseholdByGroupName(name);
  const id = "65f0dbf51f6b44a06ac74021";
  expect(res._id.toString()).toBe(id);
});

test("test findUserById", async () => {
  const id = "65f0dc971f6b44a06ac7403a";
  const res = await mut.findUserById(id);
  const email = "user2@backend.com";
  expect(res.email).toBe(email);
});

test("test findUsersByHouseholdId", async () => {
  const householdId = "65f0dbf51f6b44a06ac74021";
  const res = await mut.findUsersByHouseholdId(householdId);
  const actual = res.map((n) => n.name);
  const expected = [
    "BACKEND USER1",
    "BACKEND USER2",
    "BACKEND USER3"
  ];
  expect(actual).toStrictEqual(expected);
});

test("test findUserByEmail", async () => {
  const email = "user2@backend.com";
  const res = await mut.findUserByEmail(email);
  const id = "65f0dc971f6b44a06ac7403a";
  expect(res[0]._id.toString()).toBe(id);
});

test("test updateUser", async () => {
  const userId = "65f0dc971f6b44a06ac7403a";
  const newName = "New Name";
  const update = { name: newName };
  const res = await mut.updateUser(userId, update);
  expect(res).toBeDefined;
  const restore = { name: res.name };
  const undo = await mut.updateUser(userId, restore);
  expect(undo.name).toBe(newName);
});

test("test findChoreById", async () => {
  const id = "65f0dd361f6b44a06ac74085";
  const res = await mut.findChoreById(id);
  const chore = "USER2 CHORE1";
  expect(res.chore).toBe(chore);
});

test("test findChoresByHouseholdId", async () => {
  const householdId = "65f0dbf51f6b44a06ac74021";
  const res = await mut.findChoresByHouseholdId(householdId);
  const actual = res.map((x) => x.chore);
  const expected = [
    "USER1 CHORE1",
    "USER2 CHORE1",
    "USER2 CHORE2",
    "USER3 CHORE1",
    "USER3 CHORE2",
    "USER3 CHORE3"
  ];
  expect(actual).toStrictEqual(expected);
});

test("test findChoresByUserId", async () => {
  const userId = "65f0dc971f6b44a06ac7403a";
  const res = await mut.findChoresByUserId(userId);
  const actual = res.map((x) => x.chore);
  const expected = ["USER2 CHORE1", "USER2 CHORE2"];
  expect(actual).toStrictEqual(expected);
});

test("test updateChore", async () => {
  const choreId = "65f0dd361f6b44a06ac74085";
  const newChore = "New Chore";
  const update = { chore: newChore };
  const res = await mut.updateChore(choreId, update);
  expect(res).toBeDefined;
  const restore = { chore: res.chore };
  const undo = await mut.updateChore(choreId, restore);
  expect(undo.chore).toBe(newChore);
});

test("test add/delete", async () => {
  const house = {
    groupname: "new group",
    roommates: []
  };
  const newHouse = await mut.addHousehold(house);
  expect(newHouse._id).toBeDefined;
  const user = {
    name: "New User",
    email: "backendtesting@wicked.com",
    password: "fakepassword",
    phone: "1234",
    points: 0,
    householdId: newHouse._id
  };
  const newUser = await mut.addUser(user);
  expect(newUser._id).toBeDefined;
  const chore = {
    chore: "New Chore",
    completed: false,
    deadline: new Date(),
    points: 10,
    householdId: newHouse._id,
    userId: newUser._id,
    userName: newUser.name
  };
  const newChore = await mut.addChore(chore);
  expect(newChore._id).toBeDefined;
  const delChore = await mut.deleteChore(newChore._id);
  expect(delChore).toBeDefined;
  const delUser = await mut.deleteUser(newUser._id);
  expect(delUser).toBeDefined;
  const delHouse = await mut.deleteHousehold(newHouse._id);
  expect(delHouse).toBeDefined;
});
