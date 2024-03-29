import {update_question,update_category} from "../controller/category.js";
import express from "express";
const categoryRouter = express.Router();

// router.get("/", function (req, res) {
//     res.send("Wiki home page");
//   });

categoryRouter.route("/update").post(update_question)
categoryRouter.route("/update_name").post(update_category)


// router
//   .route("/signup")
//   .get(accountController.signupPage)
//   .post(accountController.createUser);

// router
//   .route("/logout")
//   .get(accountController.logout);

export default categoryRouter;

//https://medium.com/@cmpbilge/routing-with-nodejs-express-4ce79752e146


// MUST VIEW: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes