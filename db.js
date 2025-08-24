import mongoose from "mongoose";

// Global variable to track connection status
let isConnected = false;

const connectDb = async () => {
    // If already connected, return existing connection
    if (isConnected) {
        console.log("Using existing database connection");
        return;
    }

    try {
        const mongoURI = "mongodb://tahirsultan:_isHacked1@cluster0-shard-00-00.z2sch.mongodb.net:27017,cluster0-shard-00-01.z2sch.mongodb.net:27017,cluster0-shard-00-02.z2sch.mongodb.net:27017/MultaniMango?ssl=true&replicaSet=atlas-ranagn-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";
        
        const options = {
            maxPoolSize: 10, // Maintain up to 10 socket connections
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            bufferMaxEntries: 0, // Disable mongoose buffering
            bufferCommands: false, // Disable mongoose buffering
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // Additional options for serverless
            maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity
            connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
        };

        await mongoose.connect(mongoURI, options);
        
        isConnected = true;
        console.log("Database connected successfully");
        
        // Handle connection events
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
            isConnected = false;
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
            isConnected = false;
        });

        mongoose.connection.on('connected', () => {
            console.log('MongoDB connected');
            isConnected = true;
        });

    } catch (error) {
        console.error("Database connection error:", error);
        isConnected = false;
        throw error;
    }
};

// hi
// Helper function to ensure database operations are properly handled
export const withDb = async (operation) => {
    try {
        // Ensure connection is established
        if (!isConnected) {
            await connectDb();
        }
        
        // Execute the operation
        return await operation();
    } catch (error) {
        console.error("Database operation error:", error);
        
        // If connection is lost, try to reconnect
        if (error.name === 'MongoNetworkError' || error.name === 'MongoServerSelectionError') {
            isConnected = false;
            await connectDb();
            return await operation();
        }
        
        throw error;
    }
};

export default connectDb;