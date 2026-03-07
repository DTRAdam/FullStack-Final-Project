const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const chalk = require("chalk");
const User = require("../models/User");
const auth = require("../middlewares/auth");
const Cart = require("../models/Cart");
const registerSchema = Joi.object({
    name: Joi.object({
        first: Joi.string().min(2).required(),
        middle: Joi.string().allow(""),
        last: Joi.string().min(2).required(),
    }).required(),
    phone: Joi.string().min(9).max(14).required().pattern(/^05\d{8,9}$/),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    image: Joi.object({
        url: Joi.string().uri().allow(""),
        alt: Joi.string().allow(""),
    }).optional(),
    address: Joi.object({
        country: Joi.string().required(),
        state: Joi.string().allow(""),
        city: Joi.string().required(),
        street: Joi.string().required(),
        houseNumber: Joi.number().required(),
        zip: Joi.number().required(),
    }).required(),
    isAdmin: Joi.boolean().optional(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});

router.post("/", async (req, res) => {
    try {

        const { error } = registerSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        let existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).send("Innvalid email or password");
        }
        let newUser = new User(req.body);

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);

        await newUser.save();
        console.log(chalk.green("User registered successfully:"));

        const newCart = new Cart({ userId: newUser._id, products: [], active: true });
        await newCart.save();

        res.status(201).send(_.pick(newUser, ["_id", "name", "email"]));
    } catch (error) {
        console.log(chalk.red("FATAL ERROR during user registration:", error));
        res.status(500).send("An error occurred during registration.");
    }
});

router.get("/:id", auth, async (req, res) => {
    try {
        if (req.payload._id !== req.params.id && !req.payload.isAdmin) {
            return res.status(403).send("Access denied. You can only view your own profile.");
        }

        console.log(` ${req.params.id}`);
        const user = await User.findById(req.params.id).select("-password");

        if (!user) {
            console.log(` ${req.params.id} w`);
            return res.status(404).send("User not found.");
        }

        console.log(` ${user.name.first} `);
        res.status(200).send(user);

    } catch (error) {
        console.log("--- [Backend] An error occurred in GET /:id ---", error);
        res.status(500).send(error.message);
    }
});

// authenticate user and get token (:
router.post("/login", async (req, res) => {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) return res.status(400).send(error.details);

        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("Invalid email or password.");

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send("Invalid email or password.");

        const token = jwt.sign(_.pick(user, ["_id", "isAdmin"]), process.env.JWT_SECRET);
        res.status(200).send(token);
    } catch (error) {
        console.log(chalk.red("Error during login:", error.message));
        res.status(500).send("An internal server error occurred.");
    }
});

// get all users Admin only (:
router.get("/", auth, async (req, res) => {
    try {
        if (!req.payload.isAdmin) {
            return res.status(403).send("Access denied. Admin only.");
        }
        const users = await User.find().select("-password");
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// delete user (Admin only)
router.delete("/:id", auth, async (req, res) => {
    try {
        if (!req.payload.isAdmin) {
            return res.status(403).send("Access denied. Admin only.");
        }
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).send("User not found.");

        // Also delete their cart
        await Cart.findOneAndDelete({ userId: req.params.id });

        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// update user (Admin only)
router.patch("/:id", auth, async (req, res) => {
    try {
        if (!req.payload.isAdmin) {
            return res.status(403).send("Access denied. Admin only.");
        }

        // Remove password from updates if present
        const updates = { ...req.body };
        if (updates.password) {
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(updates.password, salt);
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updates },
            { new: true }
        ).select("-password");

        if (!user) return res.status(404).send("User not found.");
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;