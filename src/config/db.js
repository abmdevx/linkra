import mongoose from "mongoose";

const uri = process.env.MONGODB_URI_CONNECTION;

export async function connectDB(){
    try {
        if (!uri) {
            throw new Error("MongoDB URI is not defined in environment variables");
        }

        await mongoose.connect(uri);
        
        console.log("database connected successfully")
    } catch (error) {
        console.log("Error connecting in mongodb",error)
    }
}