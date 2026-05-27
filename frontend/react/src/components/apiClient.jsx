const sampleData = {
    "Customers":[
        {"customerID":"1","firstName":"Luke","lastName":"Skywalker","email":"lukeskywalker@jedi.com","phone":"0000000000"},
        {"customerID":"2","firstName":"Ben","lastName":"Kenobi","email":"obiwan@jedi.com","phone":"0000000000"},
        {"customerID":"3","firstName":"Leia","lastName":"Skywalker","email":"leiaskywalker@rebels.com","phone":"0000000000"}
    ],
    "Manufacturers": [
        {"manufacturerID":"1","brandName":"Santa Cruz Skateboards","country":"USA","contactEmail":"sales@santacruzskateboards.com","contactPhone":"831-555-4827"},
        {"manufacturerID":"2","brandName":"Powell Peralta","country":"USA","contactEmail":"info@powell-peralta.com","contactPhone":"805-555-7391"},
        {"manufacturerID":"3","brandName":"Independent Truck Company","country":"USA","contactEmail":"info@independenttrucks.com","contactPhone":"510-555-6032"},
        {"manufacturerID":"4","brandName":"Mob Grip","country":"USA","contactEmail":"support@mobgrip.com","contactPhone":"310-555-7824"},
        {"manufacturerID":"5","brandName":"Bones Bearings ","country":"USA","contactEmail":"info@bonesbearings.com","contactPhone":"415-555-2648"}
    ],
    "OrderProducts":
    [
        {"orderProductsID":"1","orderID":"1", "Customer":"Leia Skywalker","productID":"1", "productName":"Classic Dot Deck 8.25","quantity":"2"},
        {"orderProductsID":"2","orderID":"3", "Customer":"Luke Skywalker","productID":"2", "productName":"Dragon Formula Wheels 54mm", "quantity":"4"},
        {"orderProductsID":"3","orderID":"2", "Customer":"Ben Kenobi","productID":"3", "productName":"Stage 11 Standard Trucks", "quantity":"1"}
    ],
    
    "Orders":
    [
        {"orderID":"1","customerID":"3", "fullName":"Leia Skywalker", "customerEmail": "leiaskywalker@rebels.com","complete":"1","totalCost":"64.99","statusName":"completed","statusDate":'2026-01-01 10:30:00'},
        {"orderID":"2","customerID":"2", "fullName":"Ben Kenobi", "customerEmail":"obiwan@jedi.com","complete":"0","totalCost":"42.99","statusName":"pending","statusDate":'2026-01-01 10:30:00'},
        {"orderID":"3","customerID":"1", "fullName":"Luke Skywalker","customerEmail":"lukeskywalker@jedi.com", "complete":"0","totalCost":"59.99","statusName":"pending","statusDate":'2026-01-01 10:30:00'}
    ],

    
    "Products": [
        {"productID":"1","manufacturerID":"1","brandName":"Santa Cruz Skateboards","productType":"deck", "name":"Classic Dot Deck 8.25","price":"64.99","description":"Santa Cruz Classic Dot deck","SKU":"825471K"},
        {"productID":"2","manufacturerID":"2","brandName":"Powell Peralta", "productType":"wheels", "name":"Dragon Formula Wheels 54mm","price":"42.99","description":"Powell Peralta Dragon Wheels","SKU":"194362Q"},
        {"productID":"3","manufacturerID":"3","brandName":"Independent Truck Company", "productType":"trucks","name":"Stage 11 Standard Trucks","price":"59.99","description":"Independent Stage 11 trucks","SKU":"412659Z"},
        {"productID":"4","manufacturerID":"2","brandName":"Powell Peralta","productType":"bearings", "name":"Bones Reds Bearings","price":"21.99","description":"Bones Reds skateboard bearings","SKU":"638204T"},
        {"productID":"5","manufacturerID":"4","brandName":"Mob Grip", "productType":"griptape", "name":"Mob Black Griptape","price":"11.99","description":"Mob black skateboard griptape","SKU":"748213M"}
    ]
};
// Define the backend port and URL for API requests
const backendPort = import.meta.env.VITE_API_PORT;  // Use the port you assigned to the backend server, this would normally go in .env file
const backendURL = `http://${import.meta.env.VITE_API_BASE_URL}:${backendPort}`;


// Get the data from the database
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
// Get the data from the database
const getDataIDByTable = async (target) => {
    const fullURL = `${backendURL}/${target}/${target.ID}`;
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
// Get the data from the database
const deleteData = async (target) => {
    //target example {table: "customers", id: {} }
    const fullURL = `${backendURL}/${target.table}/${target.ID}`;

    try {
        // Make a GET request to the backend
        const response = await fetch(fullURL, {method: 'DELETE'});
        
        // Convert the response into JSON format
        return await response.json();
        
        // Update the message state with the response data
        //return(JSON.stringify(rows));
        
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
// Product Functions
async function getProducts() {
    const response = await fetch("http://localhost:3000/products");
    return await response.json();
};

async function deleteProduct(productID) {
    const response = await fetch(`http://localhost:3000/products/${productID}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
};

async function createProduct(product) {
    const response = await fetch("http://localhost:3000/products", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};



// Customer Fuctions
async function getCustomers() {
    return await getDataByTable("customers")
};
async function deleteCustomer(item) {
    const target = {"table":"Customers", "ID": item.customerID};
    return await deleteData(target);

};
async function createCustomer(item) {
    const target = {"table":"Customers", "item": item};
    return await createData(target)
};



// Manufacturer Functions
async function getManufacturers() {
    const response = await fetch("http://localhost:3000/manufacturers");
    return await response.json();
}

async function deleteManufacturer(manufacturerID) {
    const response = await fetch(`http://localhost:3000/manufacturers/${manufacturerID}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
};

function createManufacturer(item) {
    sampleData["Manufacturers"].push(item);
};



// Order Functions
async function getOrders() {
    return await getDataByTable("Orders");
};
async function deleteOrder(item) {
    const target = {"table":"Orders", "ID": item.orderID};
    return await deleteData(target);
};
async function createOrder(item) {
    const target = {"table":"Orders", "item": item};
    return await createData(target)
};



// OrderProducts Functions
async function getOrderProducts() {
    return await getDataByTable("OrderProducts");
};
function getOrderProductsByOrder(orderID) {
    return sampleData["OrderProducts"].filter(order => order.orderID === orderID);
};
async function deleteOrderProduct(item) {
    const target = {"table":"OrderProducts", "ID": item.orderProductsID};
    return await deleteData(target);
};
function createOrderProduct(item) {
    sampleData["OrderProducts"].push(item);
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

};