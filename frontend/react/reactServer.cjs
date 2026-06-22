// Citation
// Date: May 5, 2026
// This file is adapted from the course content CS 340
// https://canvas.oregonstate.edu/courses/2042369/pages/exploration-web-application-technology-2?module_item_id=26640188
// Port was updated, all other code is from the starter code.
//
// reactServer.cjs
// Uses common JavaScript to serve the React build folder (/dist)

const express = require('express');
const path = require('path');
const app = express();
// console.log(process.env.PORT);
// We will simply hardcode the react PORT, but normally this should be inside .env
const PORT = 6115;

// Serve the static files from the React app located in the build folder '/dist'
// React router will take over frontend routing
app.use(express.static(path.join(__dirname, 'dist')));

// Handles any requests that don't match the ones above to return the React app
// A request to '/nonExist' will redirect to the index.html where react router takes over at '/'
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server running: http://classwork.engr.oregonstate.edu:${PORT}...`);
});