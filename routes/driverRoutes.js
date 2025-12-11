const express = require("express");
const router = express.Router();
const { driverSignup, driverSignin } = require("../controllers/driverController");

router.post("/signup", driverSignup);
router.post("/signin", driverSignin);

module.exports = router;
