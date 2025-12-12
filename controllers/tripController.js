const Trip = require("../models/Trip");

exports.createTrip = async (req, res) => {
    try {
        const {
            trip_type,
            pickup_location,
            drop_location,
            pickup_date,
            pickup_time,
            fare,
            return_date,
            return_time,
            otp,
            vehicle
        } = req.body;

        // Validation for ROUND TRIP
        if (trip_type === "round" && !return_date) {
            return res.status(400).json({
                error: "Return date is required for round trip"
            });
        }

        const trip = await Trip.create({
            userId: req.user.id,
            trip_type,
            pickup_location,
            drop_location,
            pickup_date,
            pickup_time,
            fare,
            return_date: trip_type === "round" ? return_date : null,
            return_time: trip_type === "round" ? return_time : null,
            otp,
            vehicle
        });

        res.status(201).json({
            message: "Trip created successfully",
            trip
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Fetch all trips for logged-in user
exports.getUserTrips = async (req, res) => {
    try {
        const userId = req.userId; // extract actual param

        const trips = await Trip.findAll({
            where: { userId }
        });

        res.status(200).json(trips);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Driver accepts a trip
exports.assignDriver = async (req, res) => {
    try {
        const { tripId } = req.params;

        const trip = await Trip.findByPk(tripId);
        if (!trip) return res.status(404).json({ error: "Trip not found" });

        trip.driverId = req.user.id;
        trip.status = "accepted";
        await trip.save();

        res.status(200).json({ message: "Trip accepted", trip });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update trip status (on-trip, completed, cancelled)
exports.updateStatus = async (req, res) => {
    try {
        const { tripId } = req.params;
        const { status } = req.body;

        const allowed = ["pending", "accepted", "on-trip", "completed", "cancelled"];

        if (!allowed.includes(status)) {
            return res.status(400).json({ error: "Invalid trip status" });
        }

        const trip = await Trip.findByPk(tripId);
        if (!trip) return res.status(404).json({ error: "Trip not found" });

        trip.status = status;
        await trip.save();

        res.status(200).json({ message: "Status updated", trip });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
