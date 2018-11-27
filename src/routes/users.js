const express = require("express");
const router = express.Router();
const validation = require("./validation");
const user = require("../../src/db/models").User;
const userController = require("../controllers/UserController");


router.get("/users/signup", userController.signUp);
router.post("/users/signup", validation.validateUsers, userController.create);

module.exports = router;