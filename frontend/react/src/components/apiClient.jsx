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
    ,
    "Orders":
    [
    {"orderID":"1","customerID":"3", "fullName":"Leia Skywalker","complete":"1","totalCost":"64.99"},
    {"orderID":"2","customerID":"2", "fullName":"Ben Kenobi","complete":"0","totalCost":"42.99"},
    {"orderID":"3","customerID":"1", "fullName":"Luke Skywalker","complete":"0","totalCost":"59.99"}
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

    ,"ProductTypes":
    [
    {"productTypeID":"6","typeName":"apparel"},
    {"productTypeID":"3","typeName":"bearings"},
    {"productTypeID":"1","typeName":"deck"},
    {"productTypeID":"4","typeName":"griptape"},
    {"productTypeID":"5","typeName":"trucks"},
    {"productTypeID":"2","typeName":"wheels"}
    ]

    ,"Statuses":
    [
    {"statusID":"4","statusName":"Completed"},
    {"statusID":"3","statusName":"Delivered"},
    {"statusID":"1","statusName":"Ordered"},
    {"statusID":"2","statusName":"Shipped"}
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
}
function deleteProducts(item) {
    const itemIndex = sampleData["Products"].find(item);

    sampleData["Products"].splice(itemIndex, 1);
}

// Customer Fuctions
function getCustomers() {
    return sampleData["Customers"]
}
function deleteCustomer(item) {
    const customer = sampleData["Customers"].find(item);

    sampleData["Customers"].splice(customer, 1);
}
function createCustomer(customer) {
    sampleData["Customers"].append(customer);
}

// Manufacturer Functions
function getManufacturers() {
    return sampleData["Manufacturers"]
}
function deleteManufacturers(item) {
    const itemIndex = sampleData["Manufacturers"].find(item);

    sampleData["Manufacturers"].splice(itemIndex, 1);
}

// Statuses Functions
function getStatuses() {
    return sampleData["Statuses"]
}
function deleteStatuses(item) {
    const itemIndex = sampleData["Statuses"].find(item);

    sampleData["Statuses"].splice(itemIndex, 1);
}

// Order Functions
function getOrders() {
    return sampleData["Orders"]
}
function deleteOrders(item) {
    const itemIndex = sampleData["Orders"].find(item);

    sampleData["Orders"].splice(itemIndex, 1);
}

// ProductTypes Functions
function getProductTypes() {
    return sampleData["ProductTypes"]
}
function deleteProductTypes(item) {
    const itemIndex = sampleData["ProductTypes"].find(item);

    sampleData["ProductTypes"].splice(itemIndex, 1);
}

// OrderStatuses Functions
function getOrderStatuses() {
    return sampleData["OrderStatuses"]
}
function deleteOrderStatuses(item) {
    const itemIndex = sampleData["OrderStatuses"].find(item);

    sampleData["OrderStatuses"].splice(itemIndex, 1);
}

// OrderProducts Functions
function getOrderProducts() {
    return sampleData["OrderProducts"]
}

function deleteOrderProducts(item) {
    const itemIndex = sampleData["OrderProducts"].find(item);

    sampleData["OrderProducts"].splice(itemIndex, 1);
}



export default getData;
export { 
    getCustomers, 
    deleteCustomer, 
    createCustomer,

    getManufacturers, 
    deleteManufacturers,

    getOrderProducts, 
    deleteOrderProducts, 

    getOrders,
    deleteOrders, 

    getProductTypes, 
    deleteProductTypes,

    getProducts, 
    deleteProducts,

    getStatuses, 
    deleteStatuses, 

    getOrderStatuses,
    deleteOrderStatuses, 
    
    

};