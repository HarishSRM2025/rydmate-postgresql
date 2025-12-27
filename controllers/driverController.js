const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Driver = require("../models/Driver")
const JWT_SECRET = "rydmate";

/**
 * DRIVER SIGNUP
 */
exports.driverSignup = async (req, res) => {
  try {
    const {
      name,
      email,
      date_of_birth,
      phone,
      password,
      address,
      vehicle_model,
      vehicle_number,
      vehicle_color,
      license_number,
      year_of_exp
    } = req.body;

    // Check if driver already exists
    const existingDriver = await Driver.findOne({ where: { email } });
    if (existingDriver) {
      return res.status(400).json({ message: "Driver already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create driver
    const driver = await Driver.create({
      name,
      email,
      date_of_birth,
      phone,
      password: hashedPassword,
      address,
      vehicle_model,
      vehicle_number,
      vehicle_color,
      license_number,
      year_of_exp,
      no_of_trips: 0,
      total_earning: 0,
      online: false
    });

    res.status(201).json({
      message: "Driver registered successfully",
      driver: {
        id: driver.id,
        name: driver.name,
        email: driver.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Signup failed", error });
  }
};

/**
 * DRIVER SIGNIN
 */
exports.driverSignin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const driver = await Driver.findOne({ where: { email } });
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, driver.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Generate token
    const token = jwt.sign(
      { driverId: driver.id },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Driver login successful",
      token,
      driver: {
        id: driver.id,
        name: driver.name,
        email: driver.email,
        phone: driver.phone,
        vehicle_number: driver.vehicle_number,
        online: driver.online
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Signin failed", error });
  }
};

/**
 * TOGGLE ONLINE / OFFLINE
 */
exports.toggleDriverStatus = async (req, res) => {
  try {
    const { driverId } = req.params;

    const driver = await Driver.findByPk(driverId);
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    driver.online = !driver.online;
    await driver.save();

    res.json({
      message: `Driver is now ${driver.online ? "Online" : "Offline"}`,
      online: driver.online
    });
  } catch (error) {
    res.status(500).json({ message: "Status update failed", error });
  }
};
