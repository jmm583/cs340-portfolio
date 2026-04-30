CREATE OR REPLACE TABLE Customers (
    customerID int AUTO_INCREMENT,
    firstName varchar(50) NOT NULL,
    lastName varchar(50) NOT NULL,
    email varchar(254) NOT NULL UNIQUE,
    phone varchar(20) NOT NULL,
    PRIMARY KEY(customerId)
);
CREATE OR REPLACE TABLE Orders(
    orderID int AUTO_INCREMENT,
    customerID int,
    complete boolean NOT NULL,
    totalCost decimal(12,2),
    PRIMARY KEY(OrderID),
    FOREIGN KEY(customerID) REFERENCES Customers(customerID)
);
CREATE OR REPLACE TABLE Statuses(
    statusID int AUTO_INCREMENT,
    statusName varchar(25) NOT NULL UNIQUE,
    PRIMARY KEY(StatusID)
);
CREATE OR REPLACE TABLE OrderStatuses(
    orderStatusID int AUTO_INCREMENT,
    orderID int,
    statusID int,
    statusDate date NOT NULL,

    PRIMARY KEY(orderStatusID),
    FOREIGN KEY(orderID) REFERENCES Orders(orderID) ON DELETE CASCADE,
    FOREIGN KEY(statusID) REFERENCES Statuses(statusID)
);
CREATE OR REPLACE TABLE Manufacturers(
    manufacturerID int AUTO_INCREMENT,
    brandName varchar(50),
    country varchar(50),
    contactEmail varchar(254) UNIQUE,
    contactPhone varchar(25),
    PRIMARY KEY(manufacturerID)

);
CREATE TABLE ProductTypes (
    productTypeID int AUTO_INCREMENT,
    typeName varchar(50) NOT NULL UNIQUE,
    PRIMARY KEY (productTypeID)
);
 
CREATE TABLE Products (
    productID int AUTO_INCREMENT,
    manufacturerID int,
    productTypeID int,
    name varchar(50) NOT NULL,
    price decimal(12,2),
    description varchar(100),
    SKU varchar(50) UNIQUE,
    PRIMARY KEY (productID),
    FOREIGN KEY (manufacturerID) REFERENCES Manufacturers(manufacturerID),
    FOREIGN KEY (productTypeID) REFERENCES ProductTypes(productTypeID)
);
CREATE OR REPLACE TABLE OrderProducts(
    orderProductsID int AUTO_INCREMENT,
    orderID int,
    productID int,
    quantity int,
    PRIMARY KEY(orderProductsID),
    FOREIGN KEY(orderID) REFERENCES Orders(orderID) ON DELETE CASCADE,
    FOREIGN KEY(productID) REFERENCES Products(productID)
);