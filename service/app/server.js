require('dotenv').config();
const express = require('express');
const enrouten = require('express-enrouten');
const cors = require('cors');
const config = require('../config');

const app = express();
const port = process.env.PORT || config.get('PORT') || 3001;

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CORS
app.use(cors())

// Routing
app.use('/', enrouten({ directory: 'routes' }));

// Not Found handler
app.use('*', (req, res) => res.status(404).json({ message: 'Resource not found.' }));

app.listen(port, () => console.log(`App listening on port ${port}`));

module.exports = app;
