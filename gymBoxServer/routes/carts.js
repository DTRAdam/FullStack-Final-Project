const express = require("express");
const router = express.Router();
const Joi = require("joi");
const auth = require("../middlewares/auth");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// GET user cart
router.get("/:userId", auth, async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.params.userId, active: true })

        if (!cart) {
            cart = new Cart({ userId: req.params.userId, products: [], active: true });
            await cart.save();
        }

        res.status(200).send(cart);

    } catch (error) {
        res.status(500).send("Error fetching user cart: " + error.message);
    }
});


router.post("/", auth, async (req, res) => {
    try {

        // Validate
        const schema = Joi.object({
            productId: Joi.string().required(),
            quantity: Joi.number().min(1).default(1),
        });
        const { error, value } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ ok: false, reason: "validation", message: error.details[0].message });
        }

        const { productId, quantity } = value;

        const userId = req.payload && (req.payload._id || req.payload.userId);
        if (!userId) {
            return res.status(401).json({ ok: false, reason: "auth", message: "Unauthorized: missing user id in token" });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ ok: false, reason: "not_found", message: "Product not found" });
        }

        // Find or create cart and update
        let cart = await Cart.findOne({ userId, active: true });
        if (!cart) cart = new Cart({ userId, products: [], active: true });

        const idx = cart.products.findIndex(p => p.productId.toString() === productId);
        if (idx > -1) cart.products[idx].quantity += quantity;
        else cart.products.push({ productId, quantity });

        await cart.save();
        const populated = await cart.populate("products.productId");
        return res.status(200).json({ ok: true, cart: populated });

    } catch (err) {
        console.error("POST /carts error:", err);
        return res.status(500).json({ ok: false, reason: "server", message: err.message });
    }
});


// DELETE product from cart
router.delete("/:productId", auth, async (req, res) => {
    try {
        const userId = req.payload._id;
        const { productId } = req.params;

        const cart = await Cart.findOne({ userId, active: true });
        if (!cart) return res.status(404).send("Active cart not found");

        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
        if (productIndex === -1) return res.status(404).send("Product not in cart");

        cart.products.splice(productIndex, 1);
        await cart.save();

        const populatedCart = await cart.populate("products.productId");
        res.status(200).send(populatedCart);

    } catch (error) {
        res.status(500).send("Error deleting from cart: " + error.message);
    }
});

module.exports = router;
