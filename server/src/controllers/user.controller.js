import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

function createToken(user) {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET is not configured");
    return jwt.sign({ id: user._id.toString(), username: user.username }, secret, { expiresIn: "7d" });
}

function userResponse(user, token) {
    return {
        success: true,
        data: {
            user: { id: user._id, username: user.username },
            token,
        },
    };
}

export async function register(req, res) {
    try {
        const username = req.body.username?.trim().toLowerCase();
        const password = req.body.password;

        if (!username || !password) {
            return res.status(400).json({ success: false, message: "Username and password are required." });
        }
        if (!/^[a-z0-9_]{3,30}$/.test(username)) {
            return res.status(400).json({ success: false, message: "Username must be 3-30 characters using letters, numbers, or underscores." });
        }
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters." });
        }
        if (await User.exists({ username })) {
            return res.status(409).json({ success: false, message: "That username is already taken." });
        }

        const user = await User.create({ username, password });
        return res.status(201).json(userResponse(user, createToken(user)));
    } catch (error) {
        console.error("Register error:", error);
        return res.status(500).json({ success: false, message: "Unable to create your account." });
    }
}

export async function login(req, res) {
    try {
        const username = req.body.username?.trim().toLowerCase();
        const password = req.body.password;
        const user = await User.findOne({ username });

        if (!user || !password || !(await user.comparePassword(password))) {
            return res.status(401).json({ success: false, message: "Invalid username or password." });
        }

        return res.json(userResponse(user, createToken(user)));
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ success: false, message: "Unable to sign you in." });
    }
}

export function logout(req, res) {
    return res.json({ success: true, message: "Signed out successfully." });
}

export function me(req, res) {
    return res.json({ success: true, data: { user: { id: req.user._id, username: req.user.username } } });
}