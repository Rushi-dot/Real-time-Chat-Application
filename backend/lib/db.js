import mongoose from "mongoose";

export const connectdb = async () => {
    try {
       const connect = await mongoose.connect(process.env.MONGODB_URI)
       console.log("MongoDB connected successfuly");
       
    } catch (e) {
        console.log("connection error",e);
    }
}