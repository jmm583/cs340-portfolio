const sampleData = {
        "Customers":[
        {"customerID":"1","firstName":"Luke","lastName":"Skywalker","email":"lukeskywalker@jedi.com","phone":"0000000000"},
        {"customerID":"2","firstName":"Ben","lastName":"Kenobi","email":"obiwan@jedi.com","phone":"0000000000"},
        {"customerID":"3","firstName":"Leia","lastName":"Skywalker","email":"leiaskywalker@rebels.com","phone":"0000000000"}
    ]
    ,
    "Manufacturers":
    [
    {"manufacturerID":"1","brandName":"Santa Cruz Skateboards","country":"USA","contactEmail":"sales@santacruzskateboards.com","contactPhone":"831-555-4827"},
    {"manufacturerID":"2","brandName":"Powell Peralta","country":"USA","contactEmail":"info@powell-peralta.com","contactPhone":"805-555-7391"},
    {"manufacturerID":"3","brandName":"Independent Truck Company","country":"USA","contactEmail":"info@independenttrucks.com","contactPhone":"510-555-6032"},
    {"manufacturerID":"4","brandName":"Mob Grip","country":"USA","contactEmail":"support@mobgrip.com","contactPhone":"310-555-7824"},
    {"manufacturerID":"5","brandName":"Bones Bearings ","country":"USA","contactEmail":"info@bonesbearings.com","contactPhone":"415-555-2648"}
    ]
    ,
    "OrderProducts":
    [
    {"orderProductsID":"1","orderID":"1", "Customer":"Leia Skywalker","productID":"1", "productName":"Classic Dot Deck 8.25","quantity":"2"},
    {"orderProductsID":"2","orderID":"3", "Customer":"Luke Skywalker","productID":"2", "productName":"Dragon Formula Wheels 54mm", "quantity":"4"},
    {"orderProductsID":"3","orderID":"2", "Customer":"Ben Kenobi","productID":"3", "productName":"Stage 11 Standard Trucks", "quantity":"1"}
    ]
    
    "Orders":
    [
    {"orderID":"1","customerID":"3", "fullName":"Leia Skywalker", "customerEmail": "leiaskywalker@rebels.com","complete":"1","totalCost":"64.99"},
    {"orderID":"2","customerID":"2", "fullName":"Ben Kenobi", "customerEmail":"obiwan@jedi.com","complete":"0","totalCost":"42.99"},
    {"orderID":"3","customerID":"1", "fullName":"Luke Skywalker","customerEmail":"lukeskywalker@jedi.com", "complete":"0","totalCost":"59.99"}
    ]
    ,
    "OrderStatuses":
    [
    {"orderStatusID":"1","orderID":"1","statusID":"1", "statusName":"Ordered","statusDate":"2026-01-02"},
    {"orderStatusID":"2","orderID":"1","statusID":"2", "statusName":"Shipped","statusDate":"2026-01-02"},
    {"orderStatusID":"3","orderID":"1","statusID":"3", "statusName":"Delivered","statusDate":"2026-01-07"},
    {"orderStatusID":"4","orderID":"1","statusID":"4", "statusName":"Completed","statusDate":"2026-01-08"}
    ]
    ,
    "Products":
    [
    {"productID":"1","manufacturerID":"1", "brandName":"Santa Cruz Skateboards","productTypeID":"1","typeName":"deck", "name":"Classic Dot Deck 8.25","price":"64.99","description":"Santa Cruz Classic Dot deck","SKU":"825471K"},
    {"productID":"2","manufacturerID":"2","brandName":"Powell Peralta", "productTypeID":"2","typeName":"wheels", "name":"Dragon Formula Wheels 54mm","price":"42.99","description":"Powell Peralta Dragon Wheels","SKU":"194362Q"},
    {"productID":"3","manufacturerID":"3","brandName":"Independent Truck Company", "productTypeID":"5","typeName":"trucks","name":"Stage 11 Standard Trucks","price":"59.99","description":"Independent Stage 11 trucks","SKU":"412659Z"},
    {"productID":"4","manufacturerID":"2","brandName":"Powell Peralta","productTypeID":"3","typeName":"bearings", "name":"Bones Reds Bearings","price":"21.99","description":"Bones Reds skateboard bearings","SKU":"638204T"},
    {"productID":"5","manufacturerID":"4","brandName":"Mob Grip", "productTypeID":"4","typeName":"griptape", "name":"Mob Black Griptape","price":"11.99","description":"Mob black skateboard griptape","SKU":"748213M"}
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