const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = "rydmate";

exports.userSignup = async (req, res) => {
    try {
        const { name, email,phone, password } = req.body;

        const hashed = await bcrypt.hash(password, 10);

        await User.create({ name, email,phone, password: hashed, role: "customer" });

        res.json({ message: "Customer registered" });
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.userSignin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email, role: "customer" } });

        if (!user) return res.status(400).json({ message: "Customer not found" });

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) return res.status(400).json({ message: "Incorrect password" });

        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET);

        res.json({ message: "Login success", token, user });
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getUserDetails = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findByPk(userId, {
            attributes: { exclude: ["password"] }
        });

        if (!user) {
            return res.status(400).json({ message: "Customer not found" });
        }

        res.json(user);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
