let User = require('../models/User')
const bcrypt = require("bcryptjs");

let getUser = async (req, res) => {
    let users = await User.find()
    res.json(users)
}

let updateUser = async (req, res) => {
    try {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10)
        }
        let update = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!update) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(update);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

let deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    res.json(User)
}

let getProfile = async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
}

let updateProfile = async (req, res) => {
    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10)
    }
    const user = await User.findByIdAndUpdate(
        req.user.id,
        req.body,
        { new: true }
    ).select("-password");

    res.json(user);
}

let changePassword = async (req, res) => {

    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);

    const match = await bcrypt.compare(
        currentPassword,
        user.password
    );

    if (!match) {
        return res.status(400).json({
            message: "Current password is incorrect"
        });
    }

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    res.json({
        message: "Password changed successfully"
    });

}

module.exports = {
    getUser, updateUser, deleteUser, getProfile, updateProfile,changePassword
}

