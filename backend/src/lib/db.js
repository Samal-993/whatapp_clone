import mongoose from 'mongoose';
import { ENV } from './env.js';


export const connectDB = async() => {
    try{

        const {MONGO_URI} = ENV;
        if(!MONGO_URI){
            throw new Error("MONGO_URI is not defined in env variables")

        }
       const conn =  await mongoose.connect(ENV.MONGO_URI)
        console.log("MongoDB connected", conn.connection.host);
        
    }catch(err){
     console.error("Error in DB connection", err);

     process.exit(1) ; //1 status code means failure, 0 means success
    }
}