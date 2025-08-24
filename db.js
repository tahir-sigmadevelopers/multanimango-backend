import mongoose from "mongoose";

const connectDb = async()=>{
    
    try {
      await mongoose.connect("mongodb://admin:_isHacked@ac-3rlel4d-shard-00-00.daqohrw.mongodb.net:27017,ac-3rlel4d-shard-00-01.daqohrw.mongodb.net:27017,ac-3rlel4d-shard-00-02.daqohrw.mongodb.net:27017/MultaniMango?replicaSet=atlas-t5xj5a-shard-0&ssl=true&authSource=admin")
    console.log("database is connected");  
    } catch (error) {
        console.log(error);
        
        
    }    
}

export default connectDb