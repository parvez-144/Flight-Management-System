const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

connectDB();



module.exports = app;
