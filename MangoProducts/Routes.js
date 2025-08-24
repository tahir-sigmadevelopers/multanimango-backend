import express from "express"
import { deleteMango, editMangos, getMango, getSingleMango, SaveMango, getMangoStats } from "./Controller.js"

const app = express()

app.post("/mango/save", SaveMango)
app.get("/mango/get", getMango)
app.get("/mango/stats", getMangoStats)
app.get("/single/:id", getSingleMango)
app.delete("/delete/:id", deleteMango)
app.put("/edit/:id", editMangos)

export default app