const express = require("express");
const router = express.Router();
const validation = require("./validation");
const user = require("../../src/db/models").User;
const userController = require("../controllers/UserController");


router.get("/users/signup", userController.signUp);
router.post("/users/signup", validation.validateUsers, userController.create);
router.get("/users/sign_in", userController.signInForm);
router.post("/users/sign_in", validation.validateUsers, userController.signIn);
router.get("/users/sign_out", userController.signOut);
router.get("/users/:id", userController.show);


module.exports = router;