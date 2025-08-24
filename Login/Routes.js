import express from "express"
import { Login, signup } from "./Controller.js"

const app = express()

app.post("/login/user",Login)
app.post("/signup/user",signup)

export default app