const User = require("../models/User");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

let forgotPassword = async (req, res) => {

    try {

        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const token = crypto.randomBytes(32).toString("hex");

        user.resetToken = token;
        user.resetTokenExpire = Date.now() + 15 * 60 * 1000;

        await user.save();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const resetLink = `http://localhost:5173/reset-password/${token}`;

        await transporter.sendMail({
            from: `"Nova Mart" <${process.env.EMAIL}>`,
            to: user.email,
            subject: "Reset Password",
            html: `
                <h2>Password Reset</h2>

                <p>Click the button below to reset your password.</p>

                <a href="${resetLink}">
                    Reset Password
                </a>

                <p>This link expires in 15 minutes.</p>
            `
        });

        res.json({
            message: "Password reset link sent to your email."
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

module.exports = { forgotPassword };