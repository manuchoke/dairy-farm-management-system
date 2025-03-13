const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const router = express.Router();

// Initialize the GoogleGenerativeAI with the provided API key
const genAI = new GoogleGenerativeAI("AIzaSyD0fsUNtcwcAbnT43OYy27uB6FqLVXxmMM");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Route to generate content
router.post('/generate', async (req, res) => {
    const { prompt } = req.body; // Get the prompt from the request body
    try {
        const result = await model.generateContent(prompt); // Call the generateContent method
        res.json({ response: result.response.text() }); // Send the response back to the client
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({ error: "Failed to generate content" }); // Handle errors
    }
});

module.exports = router; 