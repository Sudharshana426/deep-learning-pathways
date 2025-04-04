const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json()); // Allows JSON data in requests
app.use(cors()); // Allows frontend to connect

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/certificationsDB", { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
const Certification = require("./models/Certification");

app.post("/api/certifications", async (req, res) => {
    try {
        const { name, provider, issueDate, expiryDate, credentialID, skills } = req.body;

        const newCertification = new Certification({
            name,
            provider,
            issueDate,
            expiryDate,
            credentialID,
            skills: skills.split(",").map(skill => skill.trim()) // Convert to array
        });

        await newCertification.save();
        res.json({ message: "Certification added successfully!", certification: newCertification });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
