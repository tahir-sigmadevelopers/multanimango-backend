import mongoose from "mongoose";

const connectDb = async()=>{
    
    try {
      await mongoose.connect("mongodb://localhost:27017/MangooseKaData")
    console.log("database is connected");  
    } catch (error) {
        console.log(error);
        
        
    }    
}

export default connectDb