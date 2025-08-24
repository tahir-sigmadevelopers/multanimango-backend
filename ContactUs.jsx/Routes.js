import express from "express"
import { ContactSave, getAllContacts, getContactStats, deleteContact } from "./Controller.js"

const app = express()

app.post("/save/contact", ContactSave)
app.get("/contacts", getAllContacts)
app.get("/contacts/stats", getContactStats)
app.delete("/contacts/:id", deleteContact)

export default app