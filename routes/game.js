import {game_get_one, game_get_all_name, game_create} from "../controller/game.js";
import express from "express";
const gameRouter = express.Router();

// router.get("/", function (req, res) {
//     res.send("Wiki home page");
//   });

gameRouter.route("/").get(game_get_one)

gameRouter.route("/all").get(game_get_all_name)


gameRouter
  .route("/create")
  .post(game_create);

export default gameRouter;

//https://medium.com/@cmpbilge/routing-with-nodejs-express-4ce79752e146


// MUST VIEW: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes