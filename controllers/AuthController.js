const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generatetoken");

let register = async (req, res) => {
    try {

        const user = await User.findOne({
            email: req.body.email
        });

        if (user) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashpass = await bcrypt.hash(req.body.password, 10);

        const newuser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashpass,
            role: req.body.role
        });

        await newuser.save();

        const token = generateToken(newuser);

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: newuser
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};

let login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        // Compare password
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        // Generate JWT
        const token = generateToken(user);

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = { login,register };