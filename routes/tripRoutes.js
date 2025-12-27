const express = require("express");
const router = express.Router();
const tripController = require("../controllers/tripController");
const Auth = require("../middleware/auth");

router.post("/create", Auth, tripController.createTrip);

router.get("/my-trips", Auth, tripController.getUserTrips);

router.put("/assign/:tripId", Auth, tripController.assignDriver);

router.put("/status/:tripId", Auth, tripController.updateStatus);

module.exports = router;
