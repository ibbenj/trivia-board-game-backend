import {get_board} from "../controller/board.js";
import express from "express";
const boardRouter = express.Router();


boardRouter.route("/").get(get_board);

export default boardRouter;
