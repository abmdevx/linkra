import { model, Schema } from "mongoose";

const urlSchema = new Schema(
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
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
    },
    { timestamps: true }
);

const Url = model("Url", urlSchema);

export default Url;