import { update_final } from "../controller/finalBoard.js";
import express from "express";
const finalRouter = express.Router();

finalRouter.route("/update").post(update_final)

export default finalRouter;
