import mut from './services.js';
import { test, expect } from "@jest/globals";

//Household Tests

test('test findHouseholdByID', async () => {
    const id = "65e93b29d9f311f834219bed";
    const res = await mut.findHouseholdByID(id);
    expect(res.groupname).toBe("testgrp");
});

test('test findHouseholdByGroupName', async () => {
    const name = "testgrp";
    const res =  await mut.findHouseholdByGroupName(name);
    const id = "65e93b29d9f311f834219bed";
    expect(res._id.toString()).toBe(id);
});

test('test findUserById', async () => {
    const id = "65e904e323e1ebe5d9bcca78";
    const res = await mut.findUserById(id);
    const email = "gorillas@gmail.com";
    expect(res.email).toBe(email)
});

test('test findUsersByHouseholdId', async () => {
    const householdId = "65e93b29d9f311f834219bed"
    const res = await mut.findUsersByHouseholdId(householdId);
    const actual = res.map(n => n.name);
    const expected = [
        'BACKEND TESTING USER 1',
        'BACKEND TESTING USER 2',
        '1234',
        'test',
        'Add Chore'
      ]
    expect(actual).toStrictEqual(expected);
});

test('test findUserByEmail', async () => {
    const email = "gorillas@gmail.com";
    const res = await mut.findUserByEmail(email);
    const id = "65e904e323e1ebe5d9bcca78";
    expect(res[0]._id.toString()).toBe(id);
});

test('test updateUser', async () => {
    const userId = "65e904e323e1ebe5d9bcca78"
    const newName = "New Name";
    const update = {name: newName};
    const res = await mut.updateUser(userId, update);
    expect(res).toBeDefined;
    const restore = {name: res.name};
    const undo = await mut.updateUser(userId, restore);
    expect(undo.name).toBe(newName);
});

test('test findChoreById', async () => {
    const id = "65e973ddf22c9164cf808139";
    const res = await mut.findChoreById(id);
    const chore = "mopping";
    expect(res.chore).toBe(chore);
});

test('test findChoresByHouseholdId', async () => {
    const householdId = "65e93b29d9f311f834219bed";
    const res = await mut.findChoresByHouseholdId(householdId);
    const actual = res.map(x => x.chore);
    const expected = [
        'mopping',
        'hell',
        'testing a very long name for a chore over here to see how it looks on frontend',
        'testing a very long name for a chore over here to see how it looks on frontend',
        'testing a very long name for a chore over here to see how it looks on frontend'
      ];
    expect(actual).toStrictEqual(expected);
});

test('test findChoresByUserId', async () => {
    const userId = "65e93b29d9f311f834219bef";
    const res = await mut.findChoresByUserId(userId);
    const actual = res.map(x => x.chore);
    const expected = [
        'mopping',
        'hell',
        'testing a very long name for a chore over here to see how it looks on frontend',
        'testing a very long name for a chore over here to see how it looks on frontend',
        'testing a very long name for a chore over here to see how it looks on frontend'
      ];
    expect(actual).toStrictEqual(expected);
});

test('test updateChore', async () => {
    const choreId = "65e973ddf22c9164cf808139"
    const newChore = "New Chore"
    const update = {chore: newChore};
    const res = await mut.updateChore(choreId, update);
    expect(res).toBeDefined;
    const restore = {chore: res.chore};
    const undo = await mut.updateChore(choreId, restore);
    expect(undo.chore).toBe(newChore);
});

test('test add/delete', async () => {
    const house = {
        groupname: "new group",
        roommates: []
      }
    const newHouse = await mut.addHousehold(house);
    expect(newHouse._id).toBeDefined
    const user = {
        name: "New User",
        email: "backendtesting@wicked.com",
        password: "fakepassword",
        phone: "1234",
        points: 0,
        householdId: newHouse._id
    }
    const newUser = await mut.addUser(user)
    expect(newUser._id).toBeDefined
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

