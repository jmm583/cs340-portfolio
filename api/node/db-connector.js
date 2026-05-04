



/*
// Begin Citation
// Citation for the following
// Date: Apr 1 2026
// Adapted from 
// Source URL: https://canvas.oregonstate.edu/courses/2042369/assignments/10464646
//
*/



// Get an instance of mysql we can use in the app
let mysql = require('mysql2')


// Create a 'connection pool' using the provided credentials
const pool = mysql.createPool({
    waitForConnections: true,
    connectionLimit   : 10,
    host              : process.env.DB_HOST,
    user              : process.env.DB_USER,
    password          : process.env.DB_PASSWORD,
    database          : process.env.DB_Database
}).promise(); // This makes it so we can use async / await rather than callbacks



// Export it for use in our application
module.exports = pool;
/*
// end citation
*/