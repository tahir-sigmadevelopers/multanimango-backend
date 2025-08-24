import express from "express"
import connectDb from "./db.js"
import MangoRoutes from "./MangoProducts/Routes.js"
import cors from "cors"
import dotenv from 'dotenv'
import ContactRoutes from "./ContactUs.jsx/Routes.js"
import LoginRoutes from "./Login/Routes.js"
import OrderRoutes from "./Order/Routes.js"
import mongoose from "mongoose"
const app = express()
import { v2 as cloudinary } from 'cloudinary';
import fileUpload from "express-fileupload"
const port = 3000


cloudinary.config({
  cloud_name: 'dcjvfvl1q',
  api_key: '365238719311189',
  api_secret: 'QPuR-zXIRGfdWRM2p97KOdOlUFM',
});


dotenv.config()

app.use(cors({
    origin:["http://localhost:5174","http://localhost:5173", "https://multanimango.vercel.app"]
}))

app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// Initialize database connection and setup routes
const initializeApp = async () => {
    try {
        // Wait for database connection
        await connectDb();
        
        // Setup routes after database is connected
        app.use(fileUpload())
        app.use("/api",MangoRoutes)
        app.use("/api",ContactRoutes)
        app.use("/api",LoginRoutes)
        app.use("/api",OrderRoutes)
        
        console.log("App initialized successfully");
    } catch (error) {
        console.error("Failed to initialize app:", error);
        process.exit(1);
    }
};

// Initialize the app
initializeApp();


app.get("/",(req,res)=>{
    res.send("server is running")
})

// Health check endpoint
app.get("/health", async (req, res) => {
    try {
        // Check database connection
        const dbState = mongoose.connection.readyState;
        const dbStatus = {
            0: "disconnected",
            1: "connected", 
            2: "connecting",
            3: "disconnecting"
        };
        
        // Test database connection
        let dbTest = "unknown";
        if (dbState === 1) {
            try {
                await mongoose.connection.db.admin().ping();
                dbTest = "responsive";
            } catch (pingError) {
                dbTest = "unresponsive";
            }
        }
        
        res.json({
            status: "ok",
            database: {
                state: dbStatus[dbState] || "unknown",
                test: dbTest,
                readyState: dbState
            },
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
            timestamp: new Date().toISOString()
        });
    }
});


app.listen(port,()=>{
    console.log(`server is running ${port}`);
    
})