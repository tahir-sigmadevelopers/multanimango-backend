import mongoose from "mongoose";

const connectDb = async()=>{
    
    try {
      await mongoose.connect("mongodb://tahirsultan:_isHacked1@cluster0-shard-00-00.z2sch.mongodb.net:27017,cluster0-shard-00-01.z2sch.mongodb.net:27017,cluster0-shard-00-02.z2sch.mongodb.net:27017/MultaniMango?ssl=true&replicaSet=atlas-ranagn-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0")
    console.log("database is connected");  
    } catch (error) {
        console.log(error);
        
        
    }    
}

export default connectDb