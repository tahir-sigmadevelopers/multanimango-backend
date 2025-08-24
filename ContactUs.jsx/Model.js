import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
    name: String,
    email: String,
    whatsappNo: String,
    message: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const contactModel = mongoose.model("contact", contactSchema)