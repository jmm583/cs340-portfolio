/*
// Begin Citation
// Citation for the following
// Date: Apr 1 2026
// Adapted from 
// Source URL: https://canvas.oregonstate.edu/courses/2042369/pages/exploration-implementing-cud-operations-in-your-app
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

const cors = require('cors');
app.use(cors()); 

// Database 
const db = require('./db-connector');

// DB Stored procedures friendly names
const storedProcs = {
    "reset": "sp_load_nb_skateshopdb",
    "customersSelect": "sp_CustomersSelect",
    "customersCreate": "sp_CustomersCreate",
    "customersDelete": "sp_CustomersDelete",
    "customersUpdate": "sp_CustomersUpdate",
    "ordersSelect": "sp_OrdersSelect",
    "ordersCreate": "sp_OrdersCreate",
    "ordersDelete": "sp_OrdersDelete",
    "ordersUpdate": "sp_OrdersUpdate",
    "orderproductsSelectByOrderID": "sp_OrderProductsByOrderSelect",
    "orderproductsDelete": "sp_OrderProductsDelete",
    "orderproductsSelect": "sp_OrderProductsSelect",
    "orderproductsCreate": "sp_OrderProductsCreate",
    "orderproductsUpdate": "sp_OrderProductsUpdate",

    "productsSelect": "sp_ProductsSelect",
    "productsCreate": "sp_ProductsCreate",
    "productsDelete": "sp_ProductsDelete",
    "productsUpdate": "sp_ProductsUpdate",
    
    "manufacturersSelect": "sp_ManufacturersSelect",
    "manufacturersCreate": "sp_ManufacturersCreate",
    "manufacturersDelete": "sp_ManufacturersDelete",
    "manufacturersUpdate": "sp_ManufacturersUpdate",
};
/*
    ROUTES
*/
app.get('/reset', async function( req, res) {
    console.log("reset");
    try {
        const query = `CALL ${storedProcs["reset"]}`;
        
        const [rows] = await db.query(query); 
        res.status(200).json("Success");
    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});
app.get('/customers', async function (req, res) {
    try {
        const query = `CALL ${storedProcs["customersSelect"]}`;

        const [[rows]] = await db.query(query); 

        res.json(rows);
    } catch (error) {
        console.error("Error executing queries:", error);

        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});
app.get('/customers/:id', async function (req, res) {
    try {
        const query = `CALL ${storedProcs["customersSelect"]}`;
        const [rows] = await db.query(query, [id]); 

        res.json(rows);
    } catch (error) {
        console.error("Error executing queries:", error);

        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});
app.post('/customers', async function (req, res) {
    try {
        const customer = req.body;
        const query= `CALL ${storedProcs["customersCreate"]}(?, ?, ?, ?, @new_id);`;
        const [rows] = await db.query(query, [customer.firstName, customer.lastName, customer.email, customer.phone]); 
        res.json(rows);
    } catch (error) {
        console.error("Error executing queries:", error);

        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }

});
app.delete('/customers/:id', async function (req, res) {
    try {
 
        const { id } = req.params;
        const query = `CALL ${storedProcs["customersDelete"]}(?);`;

        const [rows] = await db.query(query, [id]); 
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
        const query = `CALL ${storedProcs["ordersSelect"]}`;
        
        const [[rows]] = await db.query(query); 
        res.json(rows);
    } catch (error) {
        console.error("Error executing queries:", error);

        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});
app.get('/orders/:id', async function (req, res) {
    try {
        const query = `CALL ${storedProcs["ordersSelect"]}`;
        const id = req.body.orderID;
        const [[rows]] = await db.query(query, [id]); 
        res.json(rows);
    } catch (error) {
        console.error("Error executing queries:", error);

        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});
app.post('/orders', async function (req, res) {
    try {
        const order = req.body;

        const query = `CALL ${storedProcs["ordersCreate"]}(?, ?, ?, ?, ?, ?, @new_id);`;

        const [rows] = await db.query(query, [...order ]); 
        res.json(rows);
    } catch (error) {
        console.error("Error executing queries:", error);

        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }

});
app.delete('/orders/:id', async function (req, res) {
    try {
 
        const { id } = req.params;
        const query = `CALL ${storedProcs["ordersDelete"]}(?);`;


        const [rows] = await db.query(query, [id]); 
        res.status(200).send();
    } catch (error) {
        console.error("Error executing queries:", error);

        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

// PRODUCT ROUTES
app.get('/products', async function (req, res) {
    try {
        const query = `CALL ${storedProcs["productsSelect"]}()`;
        
        const [rows] = await db.query(query); 

        res.json(rows[0]);
    } catch (error) {
        console.error("Error executing queries:", error);

        // Send a generic error message to the browser
        res.status(500).json({ error: "DatabaseError", message: "An error occurred while executing the database queries."});
    }
});

app.post('/products', async function (req, res) {
    try {
        const data = req.body;

        console.log("Incoming product:", data);

        const query = `CALL ${storedProcs["productsCreate"]}(?, ?, ?, ?, ?, ?, @new_id);`;

        const params = [
            data.manufacturerID,
            data.name,
            data.productType,
            data.price,
            data.description,
            data.SKU
        ];

        console.log(params);

        const [rows] = await db.query(query, params);

        res._status(201).json({ message: "Product created successfully." });

    } catch (error) {
        console.error("Error executing productsCreate:", error);
        res.status(500).json({ error: "DatabaseError", message: "An error occurred while executing the database queries." });
    }
});

app.put('/products/:id', async (req, res) => {

    try {
        const product = req.body;
        const query1 = `CALL ${storedProcs["productsUpdate"]}(?, ?, ?, ?, ?, ?, ?);`;
        const { id } = req.params;
        console.log(id);

        const params = [
            id,
            req.body.manufacturerID,
            req.body.name,
            req.body.productType,
            req.body.price,
            req.body.description,
            req.body.SKU
        ];

        const [rows] = await db.query(query1, params); 
        res.status(200).json({ message: "Product updated successfully." });
    } catch (error) {
        console.error("Error executing queries:", error);

        // Send a generic error message to the browser
        res.status(500).json({ error: "DatabaseError", message: "An error occurred while executing the database queries." });
    }
});


app.delete('/products/:id', async function (req, res) {
    try {
 
        const { id } = req.params;
        const query1 = `CALL ${storedProcs["productsDelete"]}(?);`;

        const [rows] = await db.query(query1, [id]);
        res.status(200).send();
        res.redirect('/products');
    } catch (error) {
        console.error("Error executing queries:", error);

        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});  


// Manufacturers routes
app.get('/manufacturers', async function (req, res) {
    try {
        const manufacturer = req.body;
        const query = `CALL ${storedProcs["manufacturersSelect"]}()`;
        
        const [rows] = await db.query(query); 
        res.json(rows[0]);
    } catch (error) {
        console.error("Error executing queries:", error);

        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }   
});

app.put('/manufacturers/:id', async (req, res) => {

    try {
        const manufacturer = req.body;
        const query1 = `CALL ${storedProcs["manufacturersUpdate"]}(?, ?, ?, ?, ?);`;
        const { id } = req.params;
        console.log(id);

        const params = [
            id,
            req.body.brandName,
            req.body.country,
            req.body.contactEmail,
            req.body.contactPhone
        ];

        const [rows] = await db.query(query1, params); 
        res.status(200).send();
    } catch (error) {
        console.error("Error executing queries:", error);

        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

app.delete('/manufacturers/:id', async function (req, res) {
    try {
 
        const { id } = req.params;
        console.log(id);

        let query = `DELETE FROM Manufacturers WHERE manufacturerID=${id}`;

        const [rows] = await db.query(query); 
        res.status(200).send();
    } catch (error) {
        console.error("Error executing queries:", error);

        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

app.post('/manufacturers', async function (req, res) {
    try {
        const data = req.body;

        console.log(data);

        const query = `CALL ${storedProcs["manufacturersCreate"]}(?, ?, ?, ?, @new_id);`;

        const params = [
            data.brandName,
            data.country,
            data.contactEmail,
            data.contactPhone
        ];

        console.log(params);

        const [rows] = await db.query(query, params);
        res.json(rows);
    }
    catch (error) {
        console.error("Error executing queries:", error);

        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});



// orderProducts route
app.get('/orderproducts', async function (req, res) {
    try {
        const query = `CALL ${storedProcs["orderproductsSelect"]}`;
        
        const [[rows]] = await db.query(query); 
        res.json(rows);
    } catch (error) {
        console.error("Error executing queries:", error);

        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});
app.get('/orders/orderproducts/:id', async function (req, res) {
    try {
        const query = `CALL ${storedProcs["orderproductsSelectByOrderID"]}(?);`;
        const { id } = req.params;
        const [[rows]] = await db.query(query, [id]); 
        res.json(rows);
    } catch (error) {
        console.error("Error executing queries:", error);

        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});
app.post('/orderproducts', async function (req, res) {
    try {
        const orderProduct = req.body;
        const query = `CALL ${storedProcs["orderproductsCreate"]}(?, ?, ?, @new_id);`;

        const [rows] = await db.query(query, [orderProduct.orderID, orderProduct.productID, orderProduct.quantity]); 
        res.json(rows);
    } catch (error) {
        console.error("Error executing queries:", error);

        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }

});
app.delete('/orderproducts/:id', async function (req, res) {
    try {
 
        const { id } = req.params;
        const query = `CALL ${storedProcs["orderproductsDelete"]}(?);`;


        const [rows] = await db.query(query, [id]); 
        res.status(200).send();
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