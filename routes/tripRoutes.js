const express = require("express");
const router = express.Router();
const tripController = require("../controllers/tripController");
const Auth = require("../middleware/Auth");
// USER Creates Trip
router.post("/create", Auth, tripController.createTrip);

// USER Gets All Trips
router.get("/my-trips", Auth, tripController.getUserTrips);

// DRIVER Accepts Trip
router.put("/assign/:tripId", Auth, tripController.assignDriver);

// Update Trip Status
router.put("/status/:tripId", Auth, tripController.updateStatus);

module.exports = router;
