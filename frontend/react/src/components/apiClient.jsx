// ==========================================
// API CLIENT Functions
// Performs all fetch operations for the app.
// ==========================================

// Define the backend port and URL for API requests
const backendPort = import.meta.env.VITE_API_PORT;  // Use the port you assigned to the backend server, this would normally go in .env file
const backendURL = `http://${import.meta.env.VITE_API_BASE_URL}:${backendPort}`;

// ==========================================
// General Fetch Operations
// ==========================================
// ==========================================
// Get Data By Table
// ==========================================
const getDataByTable = async (target) => {
    const fullURL = `${backendURL}/${target}`;
    try {
        // Make a GET request to the backend
        const response = await fetch(fullURL);
        
        // Convert the response into JSON format
        const rows = await response.json();

        //return rows;
        // Update the message state with the response data
        return(rows);
        
    } catch (error) {
        // If the API call fails, print the error to the console
        console.log(error);
    }
};
// ==========================================
// Get Data By ID
// ==========================================
const getDataIDByTable = async (target) => {
    const fullURL = `${backendURL}/${target.table}/${target.ID}`;
    try {
        // Make a GET request to the backend
        const response = await fetch(fullURL);
        
        // Convert the response into JSON format
        const rows = await response.json();

        //return rows;
        // Update the message state with the response data
        return(rows);
        
    } catch (error) {
        // If the API call fails, print the error to the console
        console.log(error);
    }
};
// ==========================================
// Delete Data 
// ==========================================
const deleteData = async (target) => {
    //target example {table: "customers", id: {} }
    const fullURL = `${backendURL}/${target.table}/${target.ID}`;
    try {
        const response = await fetch(fullURL, {method: 'DELETE'});
        if (response.status == 400) {

            const body = await response.json();
            alert(body.message);
        } else {
            return await response.json();
        }

    } catch (error) {
        // If the API call fails, print the error to the console
        console.log(error);
    }

};
// Get the data from the database
const createData = async (target) => {
    //target example {table: "customers", item: {} }
    const fullURL = `${backendURL}/${target.table}`;

    try {
        // Make a GET request to the backend
        const response = await fetch(fullURL, 
            {
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify(target.item)
            }

        );

        return await response.json();
        
    } catch (error) {
        // If the API call fails, print the error to the console
        console.log(error);
    }
};
// ==========================================
// Update Data
// -- Not Implemented 
// ==========================================
const updateData = async (target) => { 
    //target example {table: "customers", item: {} }


}
 
// ==========================================
// Reset Functions
// ==========================================
const performReset = async function() {

    const fullURL = `${backendURL}/reset`;

    try {
        // Make a GET request to the backend
        const response = await fetch(fullURL);
        
        // Convert the response into JSON format
        return await response.json();

    } catch (error) {
        // If the API call fails, print the error to the console
        console.log(error);
    }
}


// ==========================================
// Product Functions
// ==========================================
// ==========================================
// Get ALL
// ==========================================
async function getProducts() {
    return await getDataByTable("Products");
};
// ==========================================
// Create Product 
// ==========================================
async function createProduct(item) {
    const target = { table: "Products", item };
    return await createData(target);
};
// ==========================================
// Delete Product 
// ==========================================
async function deleteProduct(item) {
    const target = { table: "Products", ID: item.productID };
    return await deleteData(target);     
};
// ==========================================
// Update Product 
// ==========================================
// needs an universal updateData function to work, not yet implemented in backend
async function updateProduct(item) {
    const target = { table: "Products", item };
    return await updateData(target);
};


// ==========================================
// Customer Functions
// ==========================================
// ==========================================
// Get ALL Customers
// ==========================================
async function getCustomers() {
    return await getDataByTable("customers")
};
// ==========================================
// Delete Customer 
// ==========================================
async function deleteCustomer(item) {
    const target = {"table":"Customers", "ID": item.customerID};
    return await deleteData(target);

};
// ==========================================
// Create Customer 
// ==========================================
async function createCustomer(item) {
    const target = {"table":"Customers", "item": item};
    return await createData(target)
};


// ==========================================
// Manufacturer Functions 
// ==========================================
// ==========================================
// Get ALL Manufacturers 
// ==========================================
async function getManufacturers() {
    return await getDataByTable("Manufacturers");
};
// ==========================================
// Create Manufacturer 
// ==========================================
async function createManufacturer(item) {
    const target = {"table":"Manufacturers", "item": item};
    return await createData(target);
};
// ==========================================
// Delete Manufacturer 
// ==========================================
async function deleteManufacturer(item) {
    const target = {"table":"Manufacturers", "ID": item};
    return await deleteData(target);
};


// ==========================================
// Orders Functions 
// ==========================================
// ==========================================
// Order Get ALL 
// ==========================================
async function getOrders() {
    return await getDataByTable("Orders");
};
// ==========================================
// Order Delete 
// ==========================================
async function deleteOrder(item) {
    const target = {"table":"Orders", "ID": item.orderID};
    return await deleteData(target);
};
// ==========================================
// Order Create 
// ==========================================
async function createOrder(item) {
    const target = {"table":"Orders", "item": item};
    return await createData(target)
};


// ==========================================
// OrderProducts Functions 
// ==========================================
// ==========================================
// OrderProducts Get ALL 
// ==========================================
async function getOrderProducts() {
    return await getDataByTable("OrderProducts");
};
// ==========================================
// OrderProducts Get By orderID 
// ==========================================
async function getOrderProductsByOrder(orderID) {

    const fullURL = `${backendURL}/Orders/OrderProducts/${orderID}`;
    try {
        // Make a GET request to the backend
        const response = await fetch(fullURL);
        
        // Convert the response into JSON format
        const rows = await response.json();

        //return rows;
        // Update the message state with the response data
        return(rows);
        
    } catch (error) {
        // If the API call fails, print the error to the console
        console.log(error);
    }
};
// ==========================================
// OrderProducts Delete
// ==========================================
async function deleteOrderProduct(item) {
    const target = {"table":"OrderProducts", "ID": item.orderProductsID};
    return await deleteData(target);
};
// ==========================================
// OrderProducts Create
// ==========================================
async function createOrderProduct(item) {
    const target = {"table":"OrderProducts", "item": item};
    return await createData(target);
};


export default getDataByTable;
export { 
    performReset,
    getDataIDByTable,
    
    getCustomers, 
    deleteCustomer, 
    createCustomer,

    getManufacturers, 
    deleteManufacturer,
    createManufacturer,

    getOrderProductsByOrder,
    getOrderProducts, 
    deleteOrderProduct, 
    createOrderProduct, 

    getOrders,
    deleteOrder,
    createOrder, 

    getProducts, 
    deleteProduct,
    createProduct,
    updateProduct

};