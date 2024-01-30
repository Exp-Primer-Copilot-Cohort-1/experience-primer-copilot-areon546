// Create web server
// Run: node comments.js
// Then, open browser and go to: http://localhost:3000/

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Create application
const app = express();
const port = 3000;

// Set up middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up routes
app.use(require('./routes'));

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});