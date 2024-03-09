// backend.js
import express from "express";
import cors from "cors";
import services from "./services.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
const port = 8000;
const secretKey = process.env.TOKEN_SECRET;

app.use(cors());
app.use(express.json());

const saltRounds = 10;

//middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ error: "Forbidden" });
    req.user = user;
    next();
  });
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/signup", async (req, res) => {
  try {
    const { name, email, phone, password, groupName } = req.body;

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

    let household = await services.findHouseholdByGroupName(groupName);

    //if household does not exist, creates one
    if (!household) {
      household = await services.addHousehold({
        groupname: groupName,
        roommates: []
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
      phone,
      householdId: household._id,
    };

    //adding user
    const savedUser = await services.addUser(newUser);

    //adding user to household
    household.roommates.push(savedUser._id);
    await household.save();

    res.status(201).json({ success: true, user: savedUser});
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "An error occurred in the server." });
  }
});

app.post("/login", async (req, res) => {
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

    //generating JWT token
    const token = jwt.sign({ email: user[0].email, id: user[0]._id }, secretKey, { expiresIn: "1h" });
    console.log("TOKEN", token);

    res.status(200).json({ message: "Sign-in successful", token, userId: user[0]._id, householdId: user[0].householdId });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred in the server." });
  }
});

//Finds Household By ID
//  GET /home/<householdId>
app.get("/home/:householdId", authenticateToken, async (req, res) => {
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
app.get("/users", authenticateToken, async (req, res) => {
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
app.get("/user/:userId", authenticateToken, async (req, res) => {
  const id = req.params["userId"];
  try {
    const result = await services.findUsersById(id);
    if (result === undefined) {
      res.status(404).send("Resource not found.");
    } else {
      res.status(200).send(result);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server.");
  }
});

//Adds A User
//  POST /user
app.post("/user", authenticateToken, async (req, res) => {
  const user = req.body;
  const savedUser = await services.addUser(user);
  if (savedUser) res.status(201).send(savedUser);
  else res.status(500).end();
});

//Deletes User By Id
//  DELETE /user/<userId>
app.delete("/user/:userId", authenticateToken, async (req, res) => {
  const id = req.params["userId"];
  let result = await services.deleteUser(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.status(204).send();
  }
});


//GET chores for user or household
app.get("/chore", authenticateToken, async (req, res) => {
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
app.post("/chore", authenticateToken, async (req, res) => {
  const chore = req.body;
  const savedChore = await services.addUser(chore);
  if (savedChore) res.status(201).send(savedChore);
  else res.status(500).end();
});

//Deletes Chore By Id
//  DELETE /chore/<choreId>
app.delete("/chore/:choreId", authenticateToken, async (req, res) => {
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