import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
    {
        originalUrl: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        shortUrl: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        }
    },
    { timestamps: true }
);

const Url = mongoose.model("Url", urlSchema);

export default Url;