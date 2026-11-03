import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export async function requireAuth(req, res, next) {
    try {
        const token = req.headers.authorization?.startsWith("Bearer ")
            ? req.headers.authorization.slice(7)
            : null;
        if (!token || !process.env.JWT_SECRET) {
            return res.status(401).json({ success: false, message: "Authentication required." });
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(payload.id).select("_id username");
        if (!user) {
            return res.status(401).json({ success: false, message: "Your session is no longer valid." });
        }

        req.user = user;
        return next();
    } catch {
        return res.status(401).json({ success: false, message: "Your session is invalid or expired." });
    }
}

export async function optionalAuth(req, res, next) {
    const token = req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.slice(7)
        : null;

    if (!token) return next();

    try {
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ success: false, message: "Authentication is not configured." });
        }
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(payload.id).select("_id username");
        if (!user) {
            return res.status(401).json({ success: false, message: "Your session is no longer valid." });
        }
        req.user = user;
        return next();
    } catch {
        return res.status(401).json({ success: false, message: "Your session is invalid or expired." });
    }
}
