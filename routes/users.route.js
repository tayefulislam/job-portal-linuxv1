const express = require("express");

const router = express.Router();
const userController = require("../Controllers/Users.Controller");
const { verifyToken } = require("../middlewares/verifyToken");

router.route("/signup").post(userController.createUser);
router.route("/login").get(userController.loginUser);
router.route("/me").get(verifyToken, userController.getMe);
router.route("/allManager").get(userController.getAllManager);

router.route("/").get(userController.getAllUser);

module.exports = router;
