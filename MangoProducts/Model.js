import mongoose from "mongoose";

const MangoSchema = mongoose.Schema({
    name: String,
    price: String,
    description: String,
    image: {
        public_id: String,
        url: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const MangoModel = mongoose.model("Mango", MangoSchema)