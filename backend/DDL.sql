-- Project: NobleGoldFish
-- Group 13 -LuckyNumber13
-- Group Members Jon Marchand, Joshua York  
-- Date: Apr 30 2026
-- Description: Step 2 Initial table creation and sample seed data.

-- Table Creation
CREATE OR REPLACE TABLE Customers (
    customerID int AUTO_INCREMENT,
    firstName varchar(50) NOT NULL,
    lastName varchar(50) NOT NULL,
    email varchar(254) NOT NULL UNIQUE,
    phone varchar(20),
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
    description varchar(100) NOT NULL,
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

INSERT INTO ProductTypes (typeName) VALUES
    ('deck'),
    ('wheels'),
    ('bearings'),
    ('griptape'),
    ('trucks'),
    ('apparel');

INSERT INTO Products(name, manufacturerID, productTypeID, price, description, SKU) VALUES
    (
        'Classic Dot Deck 8.25', 
        (SELECT manufacturerID FROM Manufacturers WHERE brandName = 'Santa Cruz Skateboards'),
        (SELECT productTypeID FROM ProductTypes WHERE typeName = 'deck'),
        64.99,
        'Santa Cruz Classic Dot deck', 
        '825471K'
    ),
    (
        'Dragon Formula Wheels 54mm', (SELECT manufacturerID FROM Manufacturers WHERE brandName = 'Powell Peralta'),
        (SELECT productTypeID FROM ProductTypes WHERE typeName = 'wheels'),
        42.99, 
        'Powell Peralta Dragon Wheels',
        '194362Q'
    ),
    (
        'Stage 11 Standard Trucks',
        (SELECT manufacturerID FROM Manufacturers WHERE brandName = 'Independent Truck Company'),
        (SELECT productTypeID FROM ProductTypes WHERE typeName = 'trucks'),
        59.99, 
        'Independent Stage 11 trucks', 
        '412659Z'
    ),
    (
        'Bones Reds Bearings', 
        (SELECT manufacturerID FROM Manufacturers WHERE brandName = 'Powell Peralta'),
        (SELECT productTypeID FROM ProductTypes WHERE typeName = 'bearings'),
        21.99, 
        'Bones Reds skateboard bearings',
        '638204T'
    ),
    (
        'Mob Black Griptape', 
        (SELECT manufacturerID FROM Manufacturers WHERE brandName = 'Mob Grip'),
        (SELECT productTypeID FROM ProductTypes WHERE typeName = 'griptape'),
        11.99, 
        'Mob black skateboard griptape', 
        '748213M'
    );

INSERT INTO Orders(customerID, complete, totalCost) VALUES
    ((Select customerID from Customers where firstName='Leia' and lastName='Skywalker'), true, 64.99),
    ((Select customerID from Customers where firstName='Ben' and lastName='Kenobi'), false, 42.99),
    ((Select customerID from Customers where firstName='Luke' and lastName='Skywalker'), false, 59.99 );


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

INSERT INTO Statuses(statusName) VALUES 
    ("Ordered"),
    ("Shipped"),
    ("Delivered"),
    ("Completed");

INSERT INTO OrderStatuses(orderID, statusDate, statusID) VALUES
    (
        (Select orderID from Orders where customerID =(Select customerID from Customers where firstName='Leia' and lastName='Skywalker')),
        '2026-01-02',
        (Select statusID from Statuses where statusName='Ordered') 
    ),
    (
        (Select orderID from Orders where customerID =(Select customerID from Customers where firstName='Leia' and lastName='Skywalker')),
        '2026-01-02',
        (Select statusID from Statuses where statusName='Shipped') 
    ),
    (
        (Select orderID from Orders where customerID =(Select customerID from Customers where firstName='Leia' and lastName='Skywalker')),
        '2026-01-07',
        (Select statusID from Statuses where statusName='Delivered') 
    ),
        (
        (Select orderID from Orders where customerID =(Select customerID from Customers where firstName='Leia' and lastName='Skywalker')),
        '2026-01-08',
        (Select statusID from Statuses where statusName='Completed') 
    );
-- End Sample Seed Data 

