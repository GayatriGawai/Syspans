const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('API Running'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

//Connection
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log('Connection established');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};
connectDB();
