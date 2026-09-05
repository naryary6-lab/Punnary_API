const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Enable JSON parsing
app.use(express.json());

// Root endpoint to verify API is active
app.get('/', (req, res) => {
    res.json({
        status: "success",
        message: "MoMore Wholesale API is live and running!"
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Start Node server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
