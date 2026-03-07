const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: false },
    inStock: { type: Boolean, default: true },
    image: {
        url: { type: String, required: true },
        alt: { type: String, required: false },
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true })
module.exports = mongoose.model("Product", productSchema);