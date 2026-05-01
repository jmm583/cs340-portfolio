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
    ((Select customerID from Customers where firstName='Leia' and lastName='Skywalker'), false, 64.99),
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

