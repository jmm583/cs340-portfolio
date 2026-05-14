const sampleData = {
    "Customers":[
        {"Customer ID":"1","First Name":"Luke","Last Name":"Skywalker","Email":"lukeskywalker@jedi.com","Phone":"0000000000"},
        {"Customer ID":"2","First Name":"Ben","Last Name":"Kenobi","Email":"obiwan@jedi.com","Phone":"0000000000"},
        {"Customer ID":"3","First Name":"Leia","Last Name":"Skywalker","Email":"leiaskywalker@rebels.com","Phone":"0000000000"}
    ]
    ,
    "Manufacturers":
    [
    {"Manufacturer ID":"1","Brand Name":"Santa Cruz Skateboards","Country":"USA","Contact Email":"sales@santacruzskateboards.com","Contact Phone":"831-555-4827"},
    {"Manufacturer ID":"2","Brand Name":"Powell Peralta","Country":"USA","Contact Email":"info@powell-peralta.com","Contact Phone":"805-555-7391"},
    {"Manufacturer ID":"3","Brand Name":"Independent Truck Company","Country":"USA","Contact Email":"info@independenttrucks.com","Contact Phone":"510-555-6032"},
    {"Manufacturer ID":"4","Brand Name":"Mob Grip","Country":"USA","Contact Email":"support@mobgrip.com","Contact Phone":"310-555-7824"},
    {"Manufacturer ID":"5","Brand Name":"Bones Bearings ","Country":"USA","Contact Email":"info@bonesbearings.com","Contact Phone":"415-555-2648"}
    ]
    ,
    "OrderProducts":
    [
    {"Order Products ID":"1","Order ID":"1", "Customer":"Leia Skywalker","Product ID":"1", "Product Name":"Classic Dot Deck 8.25","Quantity":"2"},
    {"Order Products ID":"2","Order ID":"3", "Customer":"Luke Skywalker","Product ID":"2", "Product Name":"Dragon Formula Wheels 54mm", "Quantity":"4"},
    {"Order Products ID":"3","Order ID":"2", "Customer":"Ben Kenobi","Product ID":"3", "Product Name":"Stage 11 Standard Trucks", "Quantity":"1"}
    ]
    ,
    "Orders":
    [
    {"Order ID":"1","Customer ID":"3", "Full Name":"Leia Skywalker", "Customer Email": "leiaskywalker@rebels.com","Complete":"1","Total Cost":"64.99"},
    {"Order ID":"2","Customer ID":"2", "Full Name":"Ben Kenobi", "Customer Email":"obiwan@jedi.com","Complete":"0","Total Cost":"42.99"},
    {"Order ID":"3","Customer ID":"1", "Full Name":"Luke Skywalker","Customer Email":"lukeskywalker@jedi.com", "Complete":"0","Total Cost":"59.99"}
    ]
    ,
    "Products":
    [
    {"Product ID":"1","Manufacturer ID":"1","Brand Name":"Santa Cruz Skateboards","Product Type":"deck", "Name":"Classic Dot Deck 8.25","Price":"64.99","Description":"Santa Cruz Classic Dot deck","SKU":"825471K"},
    {"Product ID":"2","Manufacturer ID":"2","Brand Name":"Powell Peralta", "Product Type":"wheels", "Name":"Dragon Formula Wheels 54mm","Price":"42.99","Description":"Powell Peralta Dragon Wheels","SKU":"194362Q"},
    {"Product ID":"3","Manufacturer ID":"3","Brand Name":"Independent Truck Company", "Product Type":"trucks","Name":"Stage 11 Standard Trucks","Price":"59.99","Description":"Independent Stage 11 trucks","SKU":"412659Z"},
    {"Product ID":"4","Manufacturer ID":"2","Brand Name":"Powell Peralta","Product Type":"bearings", "Name":"Bones Reds Bearings","Price":"21.99","Description":"Bones Reds skateboard bearings","SKU":"638204T"},
    {"Product ID":"5","Manufacturer ID":"4","Brand Name":"Mob Grip", "Product Type":"griptape", "Name":"Mob Black Griptape","Price":"11.99","Description":"Mob black skateboard griptape","SKU":"748213M"}
    ]
};
// Define the backend port and URL for API requests
const backendPort = import.meta.env.VITE_APP_API_PORT;  // Use the port you assigned to the backend server, this would normally go in .env file
const backendURL = `${import.meta.env.VITE_APP_API_BASE_URL}:${backendPort}/`;

// Get the data from the database
const getData = async function () {

    try {
        // Make a GET request to the backend
        const response = await fetch(backendURL);
        
        // Convert the response into JSON format
        const rows = await response.json();
        
        // Update the message state with the response data
        return(JSON.stringify(rows));
        
    } catch (error) {
        // If the API call fails, print the error to the console
        console.log(error);
    }
};

// Product Functions
function getProducts() {
    return sampleData["Products"];
};
function deleteProduct(item) {
    const filtered =sampleData["Products"].filter(product => product.productID !== item.productID);
    sampleData["Products"] = filtered;
    
    return sampleData["Products"];
};
function createProduct(customer) {
    sampleData["Products"].push(customer);
};

// Customer Fuctions
function getCustomers() {
    return sampleData["Customers"];
};
function deleteCustomer(item) {
    const filtered = sampleData["Customers"].filter(customer => customer.customerID !==item.customerID);
    sampleData["Customers"] = filtered;

    return sampleData["Customers"];
};
function createCustomer(customer) {
    sampleData["Customers"].push(customer);
};

// Manufacturer Functions
function getManufacturers() {
    return sampleData["Manufacturers"];
};
function deleteManufacturer(item) {
    const filtered = sampleData["Manufacturers"].filter(manufacturer => manufacturer.manufacturerID !== item.manufacturerID);

    sampleData["Manufacturers"] = filtered;
    return sampleData["Manufacturers"];
};
function createManufacturer(item) {
    sampleData["Manufacturers"].push(item);
};



// Order Functions
function getOrders() {
    return sampleData["Orders"];
};
function deleteOrder(item) {
    const filtered = sampleData["Orders"].filter(order => order.orderID !== item.orderID);

    sampleData["Orders"] = filtered;
    return sampleData["Orders"];
};
function createOrder(item) {
    sampleData["Orders"].push(item);
};



// OrderProducts Functions
function getOrderProducts() {
    return sampleData["OrderProducts"];
};
function getOrderProductsByOrder(orderID) {
    return sampleData["OrderProducts"].filter(order => order.orderID === orderID);
};
function deleteOrderProduct(item) {
    const filtered = sampleData["OrderProducts"].filter(orderProduct => orderProduct.orderProductsID !== item.orderProductsID);

    sampleData["OrderProducts"] = filtered;
    return sampleData["OrderProducts"];
};
function createOrderProduct(item) {
    sampleData["OrderProducts"].push(item);
};


export default getData;
export { 
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