// backend.js
import express from "express";
import cors from "cors";
import services from "./services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/home", async (req, res) => {
  try {
    const result = await services.getHousehold();
    console.log(result);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error ocurred in the server.");
  }
});

app.listen(process.env.PORT || port, () => {
  console.log("REST API is listening.");
});
