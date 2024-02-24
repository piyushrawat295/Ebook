const connectToMongo = require('./db');
var cors = require('cors')


async function startServer() {
    try {
        await connectToMongo();
        console.log("Connected to MongoDB");

        const express = require('express');
        const app = express();
        const port = 5000;

        app.use(cors())
        app.use(express.json())


        app.use('/api/auths', require('./routes/auths'))
        app.use('/api/notes', require('./routes/notes'))

        app.get('/', (req, res) => {
            res.send('Hello World!');
        });

        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

startServer();
