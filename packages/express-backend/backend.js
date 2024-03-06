// backend.js
import express from "express";
import cors from "cors";
import services from "./services.js";
import bcrypt from "bcrypt";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const saltRounds = 10;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/signup", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    //checking if email already exists in db
    const existingUser =
      await services.findUserByEmail(email);
    if (existingUser && existingUser.length > 0) {
      return res
        .status(400)
        .json({
          error:
            "An account associated with this email already exists"
        });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      saltRounds
    );
    const newUser = {
      name,
      email,
      password: hashedPassword,
      phone
    };
    const savedUser = await services.addUser(newUser);
    res
      .status(201)
      .json({ success: true, user: savedUser });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred in the server." });
  }
});

app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    //checking if email exists
    const user = await services.findUserByEmail(email);
    if (!user || user.length === 0) {
      return res
        .status(401)
        .json({ error: "Invalid credentials" });
    }

    //checking password
    const passwordMatch = await bcrypt.compare(
      password.trim(),
      user[0].password
    );
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ error: "Invalid credentials" });
    }
    res.status(200).json({ message: "Sign-in successful" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred in the server." });
  }
});

//Finds Household By ID
//  GET /home/<householdId>
app.get("/home/:householdId", async (req, res) => {
  const householdId = req.params["householdId"];
  try {
    const result =
      await services.findHouseholdByID(householdId);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server.");
  }
});

//Finds Users By HouseHold ID
//  GET /users?home=<householdId>
app.get("/users", async (req, res) => {
  const householdId = req.query["home"];
  try {
    if (householdId != undefined) {
      const result =
        await services.findUsersByHouseholdId(householdId);
      res.send(result);
    } else {
      console.log(
        new Error("Usage = /user?home=<householdId>")
      );
      res.status(400).send("Improper Usage");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server.");
  }
});

//Finds User By ID
//  GET /user/<userId>
app.get("/user/:userId", async (req, res) => {
  const id = req.params["userId"];
  try {
    const result = await services.findUserById(id);
    if (result === undefined) {
      res.status(404).send("Resource not found.");
    } else {
      res.status(204).send();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server.");
  }
});

//Adds A User
//  POST /user
app.post("/user", async (req, res) => {
  const user = req.body;
  const savedUser = await services.addUser(user);
  if (savedUser) res.status(201).send(savedUser);
  else res.status(500).end();
});

//Deletes User By Id
//  DELETE /user/<userId>
app.delete("/user/:userId", async (req, res) => {
  const id = req.params["userId"];
  let result = await services.deleteUser(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.status(204).send();
  }
});

//Finds Chores By HouseholdId or UserId
//  GET /chore?home=<householdId> Xor ?user=<userId>
app.get("/chore", async (req, res) => {
  const householdId = req.query["home"];
  const userId = req.query["user"];
  try {
    if ((householdId != undefined) & (userId == undefined)) {
      const result =
        await services.findChoresByHouseholdId(householdId);
      res.send(result);
    } else if (
      (householdId == undefined) &
      (userId != undefined)
    ) {
      const result = await services.findChoresByUserId(userId);
      res.send(result);
    } else {
      console.log(
        new Error(
          "Usage = /chore?home=<householdId> or ?user=<userId>"
        )
      );
      res.status(400).send("Improper Usage");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server.");
  }
});

//Adds A Chore
//  POST /chore
app.post("/chore", async (req, res) => {
  const chore = req.body;
  const savedChore = await services.addUser(chore);
  if (savedChore) res.status(201).send(savedChore);
  else res.status(500).end();
});

//Deletes Chore By Id
//  DELETE /chore/<choreId>
app.delete("/chore/:choreId", async (req, res) => {
  const id = req.params["choreId"];
  let result = await services.deleteChore(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.status(204).send();
  }
});

//Updates Chore
//app.put/patch

app.listen(process.env.PORT || port, () => {
  console.log("REST API is listening.");
});