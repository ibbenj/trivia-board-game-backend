import express, { json } from "express";
// var path = require("path");
import categoryRouter from "./routes/category.js";
import gameRouter from "./routes/game.js";
import boardRouter from "./routes/board.js";
import finalRouter from "./routes/finalBoard.js";
import cors from 'cors';

const app = express()
const port = 8080

app.use(json());
// app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(cors());

app.use("/category", categoryRouter);
app.use("/game", gameRouter);
app.use("/board", boardRouter);
app.use("/final", finalRouter);
app.get("/", function (req, res) {
  res.send("Wiki home page");
});

export default app;