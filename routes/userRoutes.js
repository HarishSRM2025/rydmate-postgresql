const express = require("express");
const router = express.Router();
const { userSignup, userSignin, getUserDetails } = require("../controllers/userController");

router.post("/signup", userSignup);
router.post("/signin", userSignin);
router.get("/getuser/:userId",getUserDetails)

module.exports = router;
