import mongoose from "mongoose";

const uri = process.env.MONGODB_URI_CONNECTION;

export async function connectDB(){
    try {
        if (!uri) {
            throw new Error("MongoDB URI is not defined in environment variables");
        }

        await mongoose.connect(uri);
        
        return true;
    } catch (error) {
        throw new Error(`MongoDB connection failed: ${error.message}`);
    }
}