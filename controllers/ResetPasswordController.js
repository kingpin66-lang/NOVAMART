const bcrypt = require("bcrypt");
const User = require("../models/User");

let resetPassword = async (req, res) => {

    try {

        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetToken: token,
            resetTokenExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid or expired reset link."
            });
        }

        user.password = await bcrypt.hash(password, 10);

        user.resetToken = undefined;
        user.resetTokenExpire = undefined;

        await user.save();

        res.json({
            message: "Password reset successfully."
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

module.exports = { resetPassword };