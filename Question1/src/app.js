const express = require('express');
const productRoutes = require('./routes/ProductRoutes')
const dotenv = require('dotenv');
const cors = require("cors");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/categories', productRoutes);

module.exports = app;
