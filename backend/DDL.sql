-- Project: NobleGoldFish
-- Group 13 -LuckyNumber13
-- Group Members Jon Marchand, Joshua York  
-- Date: Apr 30 2026
-- Description: Step 2 Initial table creation and sample seed data.

-- Avoid errors
SET FOREIGN_KEY_CHECKS = 0;
SET autocommit = 0;
BEGIN;
-- Drop tables prior to creation
DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS Manufacturers;
DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS OrderProducts;
-- Table Creation
CREATE TABLE Customers (
    customerID int AUTO_INCREMENT,
    firstName varchar(50) NOT NULL,
    lastName varchar(50) NOT NULL,
    email varchar(254) NOT NULL UNIQUE,
    phone varchar(20),
    PRIMARY KEY(customerId)
);
CREATE TABLE Orders(
    orderID int AUTO_INCREMENT,
    customerID int,
    complete boolean NOT NULL,
    totalCost decimal(12,2),
    statusDate datetime,
    statusName varchar(50),
    PRIMARY KEY(OrderID),
    FOREIGN KEY(customerID) REFERENCES Customers(customerID)
);

CREATE TABLE Manufacturers(
    manufacturerID int AUTO_INCREMENT,
    brandName varchar(50),
    country varchar(50),
    contactEmail varchar(254) UNIQUE,
    contactPhone varchar(25),
    PRIMARY KEY(manufacturerID)

);

 
CREATE TABLE Products (
    productID int AUTO_INCREMENT,
    manufacturerID int,
    productType varchar(50),
    name varchar(50) NOT NULL,
    price decimal(12,2),
    description varchar(100) NOT NULL,
    SKU varchar(50) UNIQUE,
    PRIMARY KEY (productID),
    FOREIGN KEY (manufacturerID) REFERENCES Manufacturers(manufacturerID)

);
CREATE TABLE OrderProducts(
    orderProductsID int AUTO_INCREMENT,
    orderID int,
    productID int,
    quantity int,
    PRIMARY KEY(orderProductsID),
    FOREIGN KEY(orderID) REFERENCES Orders(orderID) ON DELETE CASCADE,
    FOREIGN KEY(productID) REFERENCES Products(productID)
);
-- End Table Creation
-- Sample Seed Data

INSERT INTO Customers (firstName, lastName, email, phone) VALUES 
    ('Luke', 'Skywalker', 'lukeskywalker@jedi.com', '0000000000'),
    ('Ben', 'Kenobi', 'obiwan@jedi.com', '0000000000'),
    ('Leia', 'Skywalker', 'leiaskywalker@rebels.com', '0000000000');

INSERT INTO Manufacturers (manufacturerID, brandName, country, contactEmail, contactPhone) VALUES
    (1, 'Santa Cruz Skateboards', 'USA', 'sales@santacruzskateboards.com', '831-555-4827'),
    (2, 'Powell Peralta', 'USA', 'info@powell-peralta.com', '805-555-7391'),
    (3, 'Independent Truck Company', 'USA', 'info@independenttrucks.com', '510-555-6032'),
    (4, 'Mob Grip', 'USA', 'support@mobgrip.com', '310-555-7824'),
    (5, 'Bones Bearings ', 'USA', 'info@bonesbearings.com', '415-555-2648');


INSERT INTO Products(name, manufacturerID, productType, price, description, SKU) VALUES
    (
        'Classic Dot Deck 8.25', 
        (SELECT manufacturerID FROM Manufacturers WHERE brandName = 'Santa Cruz Skateboards'),
        'deck',
        64.99,
        'Santa Cruz Classic Dot deck', 
        '825471K'
    ),
    (
        'Dragon Formula Wheels 54mm', (SELECT manufacturerID FROM Manufacturers WHERE brandName = 'Powell Peralta'),
        'wheels',
        42.99, 
        'Powell Peralta Dragon Wheels',
        '194362Q'
    ),
    (
        'Stage 11 Standard Trucks',
        (SELECT manufacturerID FROM Manufacturers WHERE brandName = 'Independent Truck Company'),
        'trucks',
        59.99, 
        'Independent Stage 11 trucks', 
        '412659Z'
    ),
    (
        'Bones Reds Bearings', 
        (SELECT manufacturerID FROM Manufacturers WHERE brandName = 'Powell Peralta'),
        'bearings',
        21.99, 
        'Bones Reds skateboard bearings',
        '638204T'
    ),
    (
        'Mob Black Griptape', 
        (SELECT manufacturerID FROM Manufacturers WHERE brandName = 'Mob Grip'),
        'griptape',
        11.99, 
        'Mob black skateboard griptape', 
        '748213M'
    );

INSERT INTO Orders(customerID, complete, totalCost, statusName, statusDate) VALUES
    ((Select customerID from Customers where firstName='Leia' and lastName='Skywalker'), true, 64.99, "complete", '2026-01-01 10:30:00'),
    ((Select customerID from Customers where firstName='Ben' and lastName='Kenobi'), false, 42.99, "pending", '2026-01-01 10:30:00'),
    ((Select customerID from Customers where firstName='Luke' and lastName='Skywalker'), false, 59.99, "pending", '2026-01-01 10:30:00' );


INSERT INTO OrderProducts(orderID, productID, quantity) VALUES 
    (   
        (Select orderID from Orders where customerID =(Select customerID from Customers where firstName='Leia' and lastName='Skywalker')), 
        (Select productID FROM Products where SKU = '825471K'),
        2
    ),
    (   
        (Select orderID from Orders where customerID =(Select customerID from Customers where firstName='Luke' and lastName='Skywalker')), 
        (Select productID FROM Products where SKU = '194362Q'),
        4
    ),
    (   
        (Select orderID from Orders where customerID =(Select customerID from Customers where firstName='Ben' and lastName='Kenobi')), 
        (Select productID FROM Products where SKU = '412659Z'),
        1
    );




-- End Sample Seed Data 
COMMIT;
SET FOREIGN_KEY_CHECKS = 1;
SET autocommit = 1;