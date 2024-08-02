const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const routes = require('./routes');

dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static('public'));

// Use routes
app.use(routes);

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
