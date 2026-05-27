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
        //const query = `CALL ${storedProcs["customersSelect"]}`;
        const query = "SELECT customerID, firstName, lastName, email, phone FROM Customers";
        const [rows] = await db.query(query); 

        res.json(rows);
    } catch (error) {
        console.error("Error executing queries:", error);

        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});
app.get('/customers/:id', async function (req, res) {
    try {
        //const query = `CALL ${storedProcs["customersSelect"]}`;
        const query = `SELECT customerID, firstName, lastName, email, phone FROM Customers where customerID == ${req.params.id}`;
        const [rows] = await db.query(query); 

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
        const query1 = `CALL ${storedProcs["customersCreate"]}(?, ?, ?, ?, @new_id);`;
        const [rows] = await db.query(query); 
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
        
        const [[rows]] = await db.query(query); 
        res.json(rows);
    } catch (error) {
        console.error("Error executing queries:", error);

        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});
app.post('/orders', async function (req, res) {
    try {
        const orders = req.body;

        console.log(orders);
        const query1 = `CALL ${storedProcs["ordersCreate"]}(?, ?, ?, ?, ?, ?, @new_id);`;
        

        const test = [...orders];
        console.log(test);
        const [rows] = await db.query(query, [...orders]); 
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
// app.get('/products', async function (req, res) {
//     try {
//         const query = 'SELECT Products.productID, Products.manufacturerID, Manufacturers.brandName, Products.productType, Products.name, Products.price, Products.description, Products.SKU FROM Products JOIN Manufacturers ON Products.manufacturerID=Manufacturers.manufacturerID';
        
//         const [rows] = await db.query(query); 
//         res.json(rows);
//     } catch (error) {
//         // console.error("Error executing queries:", error);
//         console.error("SQL Error:", error.sqlMessage || error.message);

//         // Send a generic error message to the browser
//         // res.status(500).send("An error occurred while executing the database queries.");
//         res.status(500).json({ error: "An error occurred while executing the database queries." });
//     }
// });

app.put('/products/:id', async (req, res) => {

    try {
        const product = req.body;
        const { id } = req.params;
        console.log(id);

        let query = `UPDATE Products SET manufacturerID = '${req.body.manufacturerID}', name='${req.body.name}', productType='${req.body.productType}', price='${req.body.price}', description='${req.body.description}', SKU='${req.body.SKU}' WHERE productID = ${id}`;

        const [rows] = await db.query(query); 
        res.status(200).send();
    } catch (error) {
        console.error("Error executing queries:", error);

        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

// app.post('/products', async function (req, res) {
//     try {
//         const { manufacturerID, name, productType, price, description, SKU } = req.body;

//         console.log(req.body);
//         let query = `INSERT INTO Products (manufacturerID, name, productType, price, description, SKU) VALUES (?, ?, ?, ?, ?, ?)`;

        
//         const [rows] = await db.query(query, [manufacturerID, name, productType, price, description, SKU]);
//         res.status(201).json({ message: "Product created successfully" });

//     } catch (error) {
//         console.error("Error executing queries:", error);

//         // Send a generic error message to the browser
//         res.status(500).send("An error occurred while executing the database queries.");
//     }

// });

app.post('/products', async function (req, res) {
    try {
        // Parse frontend form information
        let data = req.body;

        // Cleanse data - If manufacturerID or price aren't numbers, make them NULL.
        if (isNaN(parseInt(data.manufacturerID)))
            data.manufacturerID = null;

        if (isNaN(parseFloat(data.price)))
            data.price = null;

        // Create and execute our queries
        // Using parameterized queries (Prevents SQL injection attacks)
        const query1 = `CALL AddProduct(?, ?, ?, ?, ?, ?, @new_id);`;

        // Store ID of last inserted row
        const [rows] = await db.query(query1, [
            data.manufacturerID,
            data.name,
            data.productType,
            data.price,
            data.description,
            data.SKU
        ]);

        console.log(
            `CREATE product. ID: ${rows.new_id} ` +
            `Name: ${data.name} | SKU: ${data.SKU}`
        );

        // Redirect the user to the updated webpage
        res.redirect('/products');

    } catch (error) {
        console.error("Error executing PL/SQL:", error);

        // Send a generic error message to the browser
        res.status(500).send(
            "An error occurred while executing the database queries."
        );
    }
});

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


app.delete('/products/:id', async function (req, res) {
    try {
 
        const {id} = req.params;
        console.log(id);

        let query = `DELETE FROM Products WHERE productID= ?`;
        const [rows] = await db.query(query, [id]); 

        res.status(200).send("Product deleted successfully");
    } catch (error) {
        console.error("Error executing queries:", error.sqlMessage);
        // Send a generic error message to the browser
        res.status(500).json({ error: error.sqlMessage });
    }
});  


// Manufacturers routes
app.get('/manufacturers', async function (req, res) {
    try {
        const query = 'SELECT Manufacturers.manufacturerID, Manufacturers.brandName, Manufacturers.country, Manufacturers.contactEmail, Manufacturers.contactPhone FROM Manufacturers';
        
        const [rows] = await db.query(query); 
        res.json(rows);
    } catch (error) {
        console.error("Error executing queries:", error);

        // Send a generic error message to the browser
        res.status(500).json({ error: 'An error occurred while executing the database queries.' });
    }
});

app.put('/manufacturers/:id', async (req, res) => {

    try {
        const manufacturer = req.body;
        const { id } = req.params;
        console.log(id);

        let query = `UPDATE Manufacturers SET brandName = '${req.body.brandName}', country='${req.body.country}', contactEmail='${req.body.contactEmail}', contactPhone='${req.body.contactPhone}' WHERE manufacturerID = ${id}`;

        const [rows] = await db.query(query); 
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
        const { brandName, country, contactEmail, contactPhone } = req.body;

        console.log(req.body);
        let query = `INSERT INTO Manufacturers (brandName, country, contactEmail, contactPhone) VALUES (?, ?, ?, ?)`;

        
        const [rows] = await db.query(query, [brandName, country, contactEmail, contactPhone]);
        res.status(201).json({ message: "Manufacturer created successfully" });

    } catch (error) {
        console.error("Error executing queries:", error);

        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});


// orderProducts route
app.get('/orderproducts', async function (req, res) {
    try {
        const query = 'SELECT OrderProducts.orderProductsID, orderID, OrderProducts.productID, Products.name, quantity, Products.price FROM OrderProducts JOIN Products ON OrderProducts.productID = Products.productID';
        
        const [rows] = await db.query(query); 
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