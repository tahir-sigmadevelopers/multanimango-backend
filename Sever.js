import express from "express"
import connectDb from "./db.js"
import MangoRoutes from "./MangoProducts/Routes.js"
import cors from "cors"
import dotenv from 'dotenv'
import ContactRoutes from "./ContactUs.jsx/Routes.js"
import LoginRoutes from "./Login/Routes.js"
import OrderRoutes from "./Order/Routes.js"
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

// Connect to database
let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }
  
  try {
    await connectDb();
    isConnected = true;
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Failed to connect to database:', error);
    throw error;
  }
};

// Connect to database on startup
connectToDatabase();

app.use(fileUpload())

// Middleware to ensure database connection
app.use(async (req, res, next) => {
  try {
    if (!isConnected) {
      await connectToDatabase();
    }
    next();
  } catch (error) {
    console.error('Database connection error in middleware:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Database connection failed' 
    });
  }
});

app.use("/api",MangoRoutes)
app.use("/api",ContactRoutes)
app.use("/api",LoginRoutes)
app.use("/api",OrderRoutes)


app.get("/",(req,res)=>{
    res.send("server is running")
})


app.listen(port,()=>{
    console.log(`server is running ${port}`);
    
})