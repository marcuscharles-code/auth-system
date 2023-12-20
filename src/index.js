import express from "express";
// const express = require("express");
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect("mongodb+srv://charlesfatunsin:QpYQieeUoq8K60B0@cluster0.edgw5ub.mongodb.net/?retryWrites=true&w=majority");()=>{
    console.log("connected to DB")
}


//user schema 
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)


app.post("/Register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.send({ message: "User already exists" });
        }

        // Create a new user
        const newUser = new User({ name, email, password });

        // Save the new user to the database
        await newUser.save();

        res.send({ message: "Registration successful" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});


app.listen(6969,()=>{
    console.log("started")
})