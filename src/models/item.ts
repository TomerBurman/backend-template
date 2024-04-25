import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    _id: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

export default mongoose.model("Item", itemSchema);
