const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    _id:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required: true
    }
})

module.exports = mongoose.model("Item", itemSchema);