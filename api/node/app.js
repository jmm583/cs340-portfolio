/*
// Begin Citation
// Citation for the following
// Date: Apr 1 2026
// Adapted from 
// Source URL: https://canvas.oregonstate.edu/courses/2042369/pages/exploration-implementing-cud-operations-in-your-app
//
// Setup is adapted from the course content. The PORT was changed and dotenv was added. 
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
// End Citation area

//Constant Error messages
DB_ERROR = {error: "An error occurred while executing the database queries."};
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

// ==========================================
// Reset Fetch Route
// ==========================================

app.get('/reset', async function( req, res) {
    try {
        const query = `CALL ${storedProcs["reset"]}`;
        
        const [rows] = await db.query(query); 
        res.status(200).json("Success");
    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).json(DB_ERROR);
    }
});

// ==========================================
// Customer Routes
// ==========================================

// ==========================================
// Customer Get All Route
// ==========================================
app.get('/customers', async function (req, res) {
    try {
        const query = `CALL ${storedProcs["customersSelect"]}`;

        const [[rows]] = await db.query(query); 

        res.status(200).json(rows);
    } catch (error) {
        console.error("Error executing queries:", error);

        // Send a generic error message to the browser
        res.status(500).json(DB_ERROR);
    }
});
// ==========================================
// Customer Route Get Customer By customerID
// ==========================================
app.get('/customers/:id', async function (req, res) {
    try {
        const query = `CALL ${storedProcs["customersSelect"]}`;
        const [rows] = await db.query(query, [id]); 

        res.status(200).json(rows);
    } catch (error) {
        console.error("Error executing queries:", error);

        // Send a generic error message to the browser
        res.status(500).json(DB_ERROR);
    }
});
// ==========================================
// Customer Create Route
// ==========================================
app.post('/customers', async function (req, res) {
    try {
        const customer = req.body;
        const query= `CALL ${storedProcs["customersCreate"]}(?, ?, ?, ?, @new_id);`;

        const [rows] = await db.query(query, [customer.firstName, customer.lastName, customer.email, customer.phone]); 
        res.status(201).json(rows);
    } catch (error) {
        console.error("Error executing queries:", error);

        // Send a generic error message to the browser
        res.status(500).json(DB_ERROR);
    }

});
// ==========================================
// Customer Delete Route
// ==========================================
app.delete('/customers/:id', async function (req, res) {
    try {
 
        const { id } = req.params;
        const query = `CALL ${storedProcs["customersDelete"]}(?);`;

        const [rows] = await db.query(query, [id]); 
        res.status(204).send();
    } catch (error) {
        console.error("Error executing queries:", error);
        if (error.errno == 1451) {
        return res.status(400).json({ 
            error: "ForeignKeyConstraintError", 
            message: "Cannot delete due to FK reference."});
        } else {
            // Send a generic error message to the browser
            res.status(500).json(DB_ERROR);
        }
    }
});
// ==========================================
// Customer Update Route
// ==========================================
app.put('/customers/:customerID', async (req, res) => {

    try {
        const customer = req.body;
        const { customerID } = req.params;

        const query = `CALL ${storedProcs["customersUpdate"]}(?, ?, ?, ?, ?);`;
        const [[[rows]]] = await db.query(query, [customerID, customer.firstName, customer.lastName, customer.email, customer.phone]); 

        res.status(200).json(rows);
    } catch (error) {
        console.error("Error executing queries:", error);

        // Send a generic error message to the browser
        res.status(500).json(DB_ERROR);
    }
});

// ==========================================
// Order Routes
// ==========================================
// ==========================================
// Order Get ALL Route
// ==========================================
app.get('/orders', async function (req, res) {
    try {
        const query = `CALL ${storedProcs["ordersSelect"]}`;
        
        const [[rows]] = await db.query(query); 
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error executing queries:", error);

        // Send a generic error message to the browser
        res.status(500).json(DB_ERROR);
    }
});
// ==========================================
// Order Get By orderID Route
// ==========================================
app.get('/orders/:id', async function (req, res) {
    try {
        const query = `CALL ${storedProcs["ordersSelect"]}`;
        const id = req.body.orderID;
        const [[rows]] = await db.query(query, [id]); 
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error executing queries:", error);

        // Send a generic error message to the browser
        res.status(500).json(DB_ERROR);
    }
});
// ==========================================
// Order Create Route
// ==========================================
app.post('/orders', async function (req, res) {
    try {
        const order = req.body;
        const query = `CALL ${storedProcs["ordersCreate"]}(?, ?, ?, ?, ?, @orderID);`;
    
        const [rows] = await db.query(query, [order.customerID, order.complete, order.totalCost, order.statusDate, order.statusName ]); 
        res.status(201).json(rows);
    } catch (error) {
        console.error("Error executing queries:", error);

        // Send a generic error message to the browser
        res.status(500).json(DB_ERROR);
    }

});
// ==========================================
// Order Delete Routes
// ==========================================
app.delete('/orders/:id', async function (req, res) {
    try {
 
        const { id } = req.params;
        const query = `CALL ${storedProcs["ordersDelete"]}(?);`;


        const [rows] = await db.query(query, [id]); 
        res.status(204).send();
    } catch (error) {
        console.error("Error executing queries:", error);
        
        // Send a generic error message to the browser
        res.status(500).json(DB_ERROR);
    }
});
// ==========================================
// Order Update Route
// ==========================================
app.put('/orders/:id', async (req, res) => {

    try {
        const order = req.body;
        const { id } = req.params;

        const query = `CALL ${storedProcs["ordersUpdate"]}(?, ?, ?, ?, ?, ?);`;

        const [rows] = await db.query(query, [id, order.customerID, order.complete, order.totalCost, order.statusDate, order.statusName]); 

        res.status(200).json(rows);
    } catch (error) {
        console.error("Error executing queries:", error);

        // Send a generic error message to the browser
        res.status(500).json(DB_ERROR);
    }
});
// ==========================================
// Product Routes
// ==========================================
// ==========================================
// Product Get ALL Route
// ==========================================
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
// ==========================================
// Product Create Route
// ==========================================
app.post('/products', async function (req, res) {
    try {
        const data = req.body;

        //console.log("Incoming product:", data);

        const query = `CALL ${storedProcs["productsCreate"]}(?, ?, ?, ?, ?, ?, @new_id);`;

        const params = [
            data.manufacturerID,
            data.name,
            data.productType,
            data.price,
            data.description,
            data.SKU
        ];

        //console.log(params);

        const [rows] = await db.query(query, params);

        res.status(201).json({ message: "Product created successfully." });

    } catch (error) {
        console.error("Error executing productsCreate:", error);
        res.status(500).json({ error: "DatabaseError", message: "An error occurred while executing the database queries." });
    }
});
// ==========================================
// Product Update Route
// ==========================================
app.put('/products/:id', async (req, res) => {

    try {
        const product = req.body;
        const query1 = `CALL ${storedProcs["productsUpdate"]}(?, ?, ?, ?, ?, ?, ?);`;
        const { id } = req.params;
        //console.log(id);

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

// ==========================================
// Product Delete Route
// ==========================================
app.delete('/products/:id', async function (req, res) {
    try {
 
        const { id } = req.params;
        const query1 = `CALL ${storedProcs["productsDelete"]}(?);`;

        await db.query(query1, [id]);
        res.status(200).send();
        // res.redirect('/products');

    } catch (error) {
        console.error("Error executing queries:", error);
        if (error.errno === 1451) {
            return res.status(400).json({ 
                error: "ForeignKeyConstraintError", 
                message: "Cannot delete product because it is referenced by an order. Please delete the associated OrderProduct item first."});
        }
        // Send a generic error message to the browser
        
        res.status(500).json({ error: "DatabaseError", message: "An error occurred while executing the database queries." });
    }
});  


// ==========================================
// Manufacturer Routes
// ==========================================
// ==========================================
// Manufacturer Get ALL Route
// ==========================================
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
// ==========================================
// Manufacturer Get by manufacturerID Route
// ==========================================
app.put('/manufacturers/:id', async (req, res) => {

    try {
        const manufacturer = req.body;
        const query1 = `CALL ${storedProcs["manufacturersUpdate"]}(?, ?, ?, ?, ?);`;
        const { id } = req.params;
        //console.log(id);

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
// ==========================================
// Manufacturer Delete Route
// ==========================================
app.delete('/manufacturers/:id', async function (req, res) {
    try {
 
        const { id } = req.params;
        //console.log(id);

        let query = `CALL ${storedProcs["manufacturersDelete"]}(?)`;

        const [rows] = await db.query(query, [id]); 
        res.status(200).send();
    } catch (error) {
        console.error("Error executing queries:", error);

        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});
// ==========================================
// Manufacturer Create Route
// ==========================================
app.post('/manufacturers', async function (req, res) {
    try {
        const data = req.body;

        //console.log(data);

        const query = `CALL ${storedProcs["manufacturersCreate"]}(?, ?, ?, ?, @new_id);`;

        const params = [
            data.brandName,
            data.country,
            data.contactEmail,
            data.contactPhone
        ];

        //console.log(params);

        const [rows] = await db.query(query, params);
        res.json(rows);
    }
    catch (error) {
        console.error("Error executing queries:", error);

        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});



// ==========================================
// OrderProducts Routes
// ==========================================
// ==========================================
// OrderProducts Get ALL Route
// ==========================================
app.get('/orderproducts', async function (req, res) {
    try {
        const query = `CALL ${storedProcs["orderproductsSelect"]}`;
        
        const [[rows]] = await db.query(query); 
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error executing queries:", error);

        // Send a generic error message to the browser
        res.status(500).json(DB_ERROR);
    }
});
// ==========================================
// OrderProducts Get BY orderID Route
// ==========================================
app.get('/orders/orderproducts/:id', async function (req, res) {
    try {
        const query = `CALL ${storedProcs["orderproductsSelectByOrderID"]}(?);`;
        const { id } = req.params;
        const [[rows]] = await db.query(query, [id]); 
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error executing queries:", error);

        // Send a generic error message to the browser
        res.status(500).json(DB_ERROR);
    }
});
// ==========================================
// OrderProducts Create Route
// ==========================================
app.post('/orderproducts', async function (req, res) {
    try {
        const orderProduct = req.body;
        const query = `CALL ${storedProcs["orderproductsCreate"]}(?, ?, ?, @new_id);`;

        const [rows] = await db.query(query, [orderProduct.orderID, orderProduct.productID, orderProduct.quantity]); 
        res.status(201).json(rows);
    } catch (error) {
        console.error("Error executing queries:", error);

        // Send a generic error message to the browser
        res.status(500).json(DB_ERROR);
    }

});
// ==========================================
// OrderProducts Delete Route
// ==========================================
app.delete('/orderproducts/:id', async function (req, res) {
    try {
 
        const { id } = req.params;
        const query = `CALL ${storedProcs["orderproductsDelete"]}(?);`;


        const [rows] = await db.query(query, [id]); 
        res.status(204).send();
    } catch (error) {
        console.error("Error executing queries:", error);

        // Send a generic error message to the browser
        res.status(500).json(DB_ERROR);
    }
});
// ==========================================
// OrderProducts Update Route
// ==========================================
app.put('/orderproducts/:id', async (req, res) => {

    try {
        const orderproduct = req.body;
        const { id } = req.params;

        const query = `CALL ${storedProcs["orderproductsUpdate"]}(?, ?, ?, ?);`;

        const [rows] = await db.query(query, [id, orderproduct.orderID, orderproduct.productID, orderproduct.quantity]); 

        res.status(200).json(rows);
    } catch (error) {
        console.error("Error executing queries:", error);

        // Send a generic error message to the browser
        res.status(500).json(DB_ERROR);
    }
});

/*
    LISTENER
*/

app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});