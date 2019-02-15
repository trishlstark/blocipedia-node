const express = require("express");
const router = express.Router();
const validation = require("./validation");
const user = require("../../src/db/models").User;
const userController = require("../controllers/UserController");

router.get("/users/signup", userController.signUp);
router.post("/users/signup", userController.create);
router.get("/users/sign_in", userController.signInForm);
router.post("/users/sign_in", userController.signIn);
router.get("/users/sign_out", userController.signOut);
router.get("/users/upgrade", userController.upgrade);
router.post("/users/:id/upgrade", userController.payment);
router.post("/users/:id/downgrade", userController.downgrade);
router.get("/users/collaborations", userController.showCollaborations);

module.exports = router;