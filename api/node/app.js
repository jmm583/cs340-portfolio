/*
// Begin Citation
// Citation for the following
// Date: Apr 1 2026
// Adapted from 
// Source URL: https://canvas.oregonstate.edu/courses/2042369/assignments/10464646
//
*/

/*
    SETUP
*/

// Express
const express = require('express');  // We are using the express library for the web server
const app = express();              // We need to instantiate an express object to interact with the server in our code
app.use(express.json());             
require('dotenv').config();
const PORT = process.env.PORT;     // Set a port number

// Database 
const db = require('./db-connector');

/*
    ROUTES
*/

app.get('/customers', async function (req, res) {
    try {
        const query = 'SELECT firstName, lastName, email, phone FROM Customers';
        
        const [rows] = await db.query(query); 
        res.json(rows);
    } catch (error) {
        console.error("Error executing queries:", error);

        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});
app.post('/customers/add', async function (req, res) {
    try {
        const customer = req.body;

        console.log(customer);
        let query = `INSERT INTO Customers (firstName, lastName, email) VALUES ('${customer.firstName}', '${customer.lastName}', '${customer.email}' )`;

        
        const [rows] = await db.query(query); 
        res.json(rows);
    } catch (error) {
        console.error("Error executing queries:", error);

        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }

});
app.delete('/customers/delete/:id', async function (req, res) {
    try {
 
        const { id } = req.params;
        console.log(id);

        let query = `DELETE FROM Customers WHERE customerID=${id}`;

        
        const [rows] = await db.query(query); 
        res.status(200).send();
    } catch (error) {
        console.error("Error executing queries:", error);

        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});
app.put('/customers/:id', async (req, res) => {

    try {
        const customer = req.body;
        const { id } = req.params;
        console.log(id);

        let query = `UPDATE Customers SET firstName = '${req.body.firstName}', lastName='${req.body.lastName}', email='${req.body.email}', phone='${req.body.phone}' WHERE email = @email`;

         
        const [rows] = await db.query(query); 
        res.status(200).send();
    } catch (error) {
        console.error("Error executing queries:", error);

        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});
app.get('/orders', async function (req, res) {
    try {
        const query = 'SELECT orderID, customerID, firstName, lastName, complete, totalCost FROM Orders JOIN Customers ON Order.customerID = Customers.customerID';
        
        const [rows] = await db.query(query); 
        res.json(rows);
    } catch (error) {
        console.error("Error executing queries:", error);

        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});
app.get('/products', async function (req, res) {
    try {
        const query = 'SELECT productID, manufacturerID, brandName, productType, name, price, description, SKU FROM Products JOIN Manufacturers ON Products.manufacturerID=Manufacturers.manufacturerID';
        
        const [rows] = await db.query(query); 
        res.json(rows);
    } catch (error) {
        console.error("Error executing queries:", error);

        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});
app.get('/manufacturers', async function (req, res) {
    try {
        const query = 'SELECT manufacturerID, brandName, country, contactEmail, contactPhone FROM Manufacturers';
        
        const [rows] = await db.query(query); 
        res.json(rows);
    } catch (error) {
        console.error("Error executing queries:", error);

        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});
app.get('/orderproducts', async function (req, res) {
    
    try {
        const query = 'SELECT orderProductsID, orderID, productID, Products.name, quantity, Products.price FROM OrderProducts JOIN Products ON OrderProducts.productID = Products.productID';
        
        const [rows] = await db.query(query); 
        res.json(rows);
    } catch (error) {
        console.error("Error executing queries:", error);

        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});


/*
    LISTENER
*/

app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});