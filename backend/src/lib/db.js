import mongoose from 'mongoose';


export const connectDB = async() => {
    try{

        const {MONGO_URI} = process.env;
        if(!MONGO_URI){
            throw new Error("MONGO_URI is not defined in env variables")
        }
       const conn =  await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected", conn.connection.host);
        
    }catch(err){
     console.error("Error in DB connection", err);

     process.exit(1) ; //1 status code means failure, 0 means success
    }
}