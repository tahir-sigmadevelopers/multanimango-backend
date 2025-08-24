import mongoose from "mongoose";

const connectDb = async()=>{
    
    try {
      // Check if already connected
      if (mongoose.connection.readyState === 1) {
        console.log("Database already connected");
        return;
      }

      await mongoose.connect("mongodb://admin:_isHacked@ac-3rlel4d-shard-00-00.daqohrw.mongodb.net:27017,ac-3rlel4d-shard-00-01.daqohrw.mongodb.net:27017,ac-3rlel4d-shard-00-02.daqohrw.mongodb.net:27017/MultaniMango?replicaSet=atlas-t5xj5a-shard-0&ssl=true&authSource=admin", {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        maxPoolSize: 10,
        minPoolSize: 1,
        maxIdleTimeMS: 30000,
        retryWrites: true,
        w: 'majority'
      });
      console.log("database is connected");  
    } catch (error) {
        console.log("Database connection error:", error);
        throw error;
    }    
}

export default connectDb