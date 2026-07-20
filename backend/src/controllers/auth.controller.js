import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export const register = async (req, res) => {
    try {
        const { name, email, phone, password, profileImage } = req.body;
        if (!name || !email || !phone || !password) {
            return res.status(400).json({ success: false, message: "Name, email, phone and password are required." });
        }
        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email or phone already exists." });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name, email, phone, password: hashedPassword, profileImage,
        });
        const safeUser = await User.findOne({ id: user.id }).select("-password");
        res.status(201).json({ success: true, message: "Registration successful.", user: safeUser });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required." });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid email or password." });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid email or password." });
        }
        const safeUser = await User.findOne({ id: user.id }).select("-password");
        res.status(200).json({ success: true, message: "Login successful.", user: safeUser });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};