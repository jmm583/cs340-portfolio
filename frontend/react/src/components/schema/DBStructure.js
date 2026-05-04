const Customers = [
    {"field_name":"customerID", "type":"number"},
    {"field_name":"firstName", "type":"text"},
    {"field_name":"lastName", "type":"text"},
    {"field_name":"email", "type":"number"},
    {"field_name":"phone", "type":"number"},
    
];
const Manufacturers = 
[
    {"field_name":"manufacturerID", "type":"number"},
    {"field_name":"brandName", "type":"text"},
    {"field_name":"country", "type":"text"},
    {"field_name":"contactEmail", "type":"text"},
    {"field_name":"contactPhone", "type":"text"},

];
const OrderProducts = [
    {"field_name":"orderProductsID", "type":"number"},
    {"field_name":"orderID", "type":"number"},
    {"field_name":"productID", "type":"number"},
    {"field_name":"quantity", "type":"number"},

];
const Orders = [
    {"field_name":"orderID", "type":"number"},
    {"field_name":"customerID", "type":"number"},
    {"field_name":"complete", "type":"checkbox"},
    {"field_name":"totalCost", "type":"number"},

];
const Products = [
    {"field_name":"productID", "type":"number"},
    {"field_name":"manufacturerID", "type":"number"},
    {"field_name":"name", "type":"text"},
    {"field_name":"productTypeID", "type":"text"},
    {"field_name":"price", "type":"number"},
    {"field_name":"description", "type":"text"},
    {"field_name":"SKU", "type":"text"},

];
const Statuses = [
    {"field_name":"statusID", "type":"number"},
    {"field_name":"statusName", "type":"text"},
];
const OrderStatuses = [
    {"field_name":"orderStatusID", "type":"number"},
    {"field_name":"statusID", "type":"number"},
    {"field_name":"statusDate", "type":"date"},
];
const ProductTypes = [
    {"field_name":"productTypeID", "type":"number"},
    {"field_name":"typeName", "type":"number"},
];

export default Customers;
export { Customers, Manufacturers, Statuses, OrderStatuses, OrderProducts, Orders, Products, ProductTypes}