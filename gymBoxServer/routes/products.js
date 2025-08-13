const express = require("express");
const router = express.Router();
const Joi = require("joi");
const chalk = require("chalk");
const auth = require("../middlewares/auth");
const Product = require("../models/Product");

const productSchema = Joi.object({
    title: Joi.string().min(2).required(),
    description: Joi.string().min(10).required(),
    price: Joi.number().min(0).required(),
    category: Joi.string().required(),
    inStock: Joi.boolean().default(true),
    image: Joi.object({
        url: Joi.string().uri().required(),
        alt: Joi.string().min(2).required(),
    }).required(),
});

// Add a new product Admin only (:
router.post("/", auth, async (req, res) => {
    try {
        if (!req.payload.isAdmin) {
            return res.status(403).send("Access denied. Only admins can add products.");
        }

        const { error } = productSchema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let product = new Product(req.body);
        await product.save();

        console.log(chalk.green("Product added successfully:", product.title));
        res.status(201).send(product);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// get all products (:
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// get a single product (:
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send("Product not found.");
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// update a product Admin only (:
router.put("/:id", auth, async (req, res) => {
    try {
        if (!req.payload.isAdmin) {
            return res.status(403).send("Access denied. Only admins can update products.");
        }

        const { error } = productSchema.validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).send("Product not found.");

        res.status(200).send(product);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// delete a product Admin only (:
router.delete("/:id", auth, async (req, res) => {
    try {
        if (!req.payload.isAdmin) {
            return res.status(403).send("Access denied. Only admins can delete products.");
        }

        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).send("Product not found.");

        res.status(200).send("Product deleted successfully.");
    } catch (error) {
        res.status(500).send(error.message);
    }
});


module.exports = router;