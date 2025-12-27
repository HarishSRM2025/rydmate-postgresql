const express = require("express");
const router = express.Router();
const {driverSignup,driverSignin,toggleDriverStatus} = require("../controllers/driverController");

router.post("/signup", driverSignup);
router.post("/signin", driverSignin);
router.put("/toggle-status/:driverId", toggleDriverStatus);

module.exports = router;
