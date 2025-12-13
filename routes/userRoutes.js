const express = require("express");
const router = express.Router();
const { userSignup, userSignin, getUserDetails, changePassword } = require("../controllers/userController");

router.post("/signup", userSignup);
router.post("/signin", userSignin);
router.get("/getuser/:userId",getUserDetails)
router.put("/update/:userId", updateUser);
router.put("/change-password/:userId",changePassword);

module.exports = router;
