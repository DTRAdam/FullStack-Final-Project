const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: {
            first: { type: String, required: true },
            middle: { type: String, default: "" },
            last: { type: String, required: true },
        },
        required: true,
    },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: {
        type: {
            url: { type: String, default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" },
            alt: { type: String, default: "User profile image" },
        },
    },
    address: {
        type: {
            country: { type: String, required: true },
            state: { type: String, default: "" },
            city: { type: String, required: true },
            street: { type: String, required: true },
            houseNumber: { type: Number, required: true },
            zip: { type: Number, required: true },
        },
        required: true,
    },
    isAdmin: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);