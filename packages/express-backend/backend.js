// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/chores", (req, res) => {

});

app.get("/roommates", (req, res) => {

});

app.get("/points", (req, res) => {

});

app.listen(port, () => {
    console.log(
        `Example app listening at https://localhost:${port}`
    );
}); 
