const connectToMongo = require('./db');
const cors = require('cors');
const express = require('express');
const path = require('path');

async function startServer() {
    try {
        await connectToMongo();
        console.log("Connected to MongoDB");

        const app = express();
        const port = 5000;

        // Enable CORS
        app.use(cors());

        // Parse JSON bodies
        app.use(express.json());

        // Serve React frontend
        app.use(express.static(path.resolve(__dirname, 'Frontend', 'build')));

        // API routes
        app.use('/api/auths', require('./routes/auths'));
        app.use('/api/notes', require('./routes/notes'));

        // Serve React app for any other route
        app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, 'Frontend', 'build', 'index.html'));
        });

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

startServer();
