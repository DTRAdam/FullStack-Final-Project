const express = require("express");
const router = express.Router();
const Joi = require("joi");
const auth = require("../middlewares/auth");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

router.get("/", auth, async (req, res) => {
    try {
        const userId = req.payload._id;
        if (!userId) {
            return res.status(401).json({ ok: false, message: "Unauthorized: User ID not found in token." });
        }

        let cart = await Cart.findOne({ userId: userId, active: true }).populate("products.productId");

        if (!cart) {
            cart = new Cart({ userId: userId, products: [], active: true });
            await cart.save();
        }

        res.status(200).json({ ok: true, cart });
    } catch (error) {
        console.error("Error fetching user cart:", error);
        res.status(500).json({ ok: false, message: "Internal server error: " + error.message });
    }
});


router.get("/:userId", auth, async (req, res) => {
    try {
        const authenticatedUserId = req.payload._id;
        const requestedUserId = req.params.userId;


        if (authenticatedUserId !== requestedUserId && !req.payload.isAdmin) {
            return res.status(403).json({ ok: false, message: "Forbidden: You can only view your own cart." });
        }

        let cart = await Cart.findOne({ userId: requestedUserId, active: true }).populate("products.productId");

        if (!cart) {
            cart = new Cart({ userId: requestedUserId, products: [], active: true });
            await cart.save();
        }

        res.status(200).json({ ok: true, cart });
    } catch (error) {
        console.error("Error fetching specific user cart:", error);
        res.status(500).json({ ok: false, message: "Internal server error: " + error.message });
    }
});

router.post("/", auth, async (req, res) => {
    try {
        const schema = Joi.object({
            productId: Joi.string().required(),
            quantity: Joi.number().min(1).default(1),
        });
        const { error, value } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ ok: false, reason: "validation", message: error.details[0].message });
        }

        const { productId, quantity } = value;
        const userId = req.payload._id;

        if (!userId) {
            return res.status(401).json({ ok: false, reason: "auth", message: "Unauthorized: missing user id in token" });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ ok: false, reason: "not_found", message: "Product not found" });
        }

        let cart = await Cart.findOne({ userId, active: true });
        if (!cart) {
            cart = new Cart({ userId, products: [], active: true });
        }

        const productInCartIndex = cart.products.findIndex(p => p.productId.toString() === productId);
        if (productInCartIndex > -1) {
            cart.products[productInCartIndex].quantity += quantity;
        } else {
            cart.products.push({ productId, quantity });
        }

        await cart.save();
        const populatedCart = await cart.populate("products.productId");
        return res.status(200).json({ ok: true, cart: populatedCart });
    } catch (err) {
        console.error("POST /carts error:", err);
        return res.status(500).json({ ok: false, reason: "server", message: err.message });
    }
});

router.delete("/:userId/:productId", auth, async (req, res) => {
    try {
        const authenticatedUserId = req.payload._id;
        const { userId, productId } = req.params;

        if (authenticatedUserId !== userId && !req.payload.isAdmin) {
            return res.status(403).json({ ok: false, message: "Forbidden: You cannot modify this cart." });
        }

        let cart = await Cart.findOne({ userId: userId, active: true });
        if (!cart) {
            return res.status(404).json({ ok: false, message: "Active cart not found for this user." });
        }

        const initialLength = cart.products.length;
        cart.products = cart.products.filter(p => p.productId.toString() !== productId);

        if (cart.products.length === initialLength) {
            return res.status(404).json({ ok: false, message: "Product not found in cart." });
        }

        await cart.save();
        const populatedCart = await cart.populate("products.productId");
        res.status(200).json({ ok: true, cart: populatedCart });

    } catch (error) {
        console.error("Error deleting from cart:", error);
        res.status(500).json({ ok: false, message: "Internal server error: " + error.message });
    }
});


module.exports = router;