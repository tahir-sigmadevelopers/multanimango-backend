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
    origin:["http://localhost:5174","http://localhost:5173"]
}))

app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

connectDb()

app.use(fileUpload())
app.use("/api",MangoRoutes)
app.use("/api",ContactRoutes)
app.use("/api",LoginRoutes)
app.use("/api",OrderRoutes)




app.listen(port,()=>{
    console.log(`server is running ${port}`);
    
})