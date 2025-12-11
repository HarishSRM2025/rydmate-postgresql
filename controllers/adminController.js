const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = "rydmate";

exports.adminSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const hashed = await bcrypt.hash(password, 10);

        await User.create({ name, email, password: hashed, role: "admin" });

        res.json({ message: "Admin registered" });
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.adminSignin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email, role: "admin" } });

        if (!user) return res.status(400).json({ message: "Admin not found" });

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) return res.status(400).json({ message: "Incorrect password" });

        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET);

        res.json({ message: "Admin login success", token, user });
    } catch (err) {
        res.status(500).json(err);
    }
};
