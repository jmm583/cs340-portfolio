-- #####################
-- Customers
-- #####################

-- #############################
-- Customers SELECT 
-- #############################
DROP PROCEDURE IF EXISTS sp_CustomersSelect;
DELIMITER //
CREATE PROCEDURE sp_CustomersSelect()
BEGIN
    SELECT customerID, firstName, lastName, email, phone 
    FROM Customers
    ORDER BY email ASC;
END //
DELIMITER ;

-- #############################
-- Customers CREATE 
-- #############################
DROP PROCEDURE IF EXISTS sp_CustomersCreate;

DELIMITER //
CREATE PROCEDURE sp_CustomersCreate(
    IN firstName VARCHAR(50), 
    IN lastName VARCHAR(50), 
    IN email VARCHAR(254), 
    IN phone VARCHAR(20),
    OUT c_id INT)
BEGIN
    DECLARE customerID INT;
    INSERT INTO Customers (firstName, lastName, email, phone) 
    VALUES (firstName, lastName, email, phone);

    -- Store the ID of the last inserted row
    SELECT LAST_INSERT_ID() into customerID;
    -- Display the ID of the last inserted person.
    SELECT LAST_INSERT_ID() AS 'c_id';


END //
DELIMITER ;
-- #############################
-- Customers Update 
-- #############################
-- #############################
-- Customers DELETE 
-- #############################

DROP PROCEDURE IF EXISTS sp_CustomersDelete;

DELIMITER //
CREATE PROCEDURE sp_CustomersDelete(IN c_id INT)
BEGIN
    DECLARE error_message VARCHAR(255); 

    -- error handling
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Roll back the transaction on any error
        ROLLBACK;
        -- Propogate the custom error message to the caller
        RESIGNAL;
    END;

    START TRANSACTION;

        DELETE FROM Customers WHERE customerID = c_id;


        -- ROW_COUNT() returns the number of rows affected by the preceding statement.
        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in Customers for id: ', c_id);
            -- Trigger custom error, invoke EXIT HANDLER
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //
DELIMITER ;
-- #####################
-- Orders
-- #####################
-- #####################
-- Orders SELECT
-- #####################
DROP PROCEDURE IF EXISTS sp_OrdersSelect;
DELIMITER //
CREATE PROCEDURE sp_OrdersSelect()
BEGIN
SELECT orderID, Orders.customerID, firstName, lastName, complete, totalCost, statusName, statusDate 
FROM Orders 
JOIN Customers ON Orders.customerID = Customers.customerID 
ORDER BY statusDate DESC;
END //
DELIMITER ;
-- #####################
-- Orders CREATE
-- #####################
DROP PROCEDURE IF EXISTS sp_OrdersCreate;

DELIMITER
    //
CREATE PROCEDURE sp_OrdersCreate(
    IN p_orderID INT,
    IN p_customerID INT,
    IN p_complete BOOLEAN,
    IN p_totalCost DECIMAL(12, 2),
    IN p_statusDate DATETIME,
    IN p_statusName VARCHAR(50)
)
BEGIN
    INSERT INTO Orders(
        customerID,
        complete,
        totalCost,
        statusDate,
        statusName
    )
VALUES(
    p_customerID,
    p_complete,
    p_totalCost,
    p_statusDate,
    p_statusName
) ;
-- Optional: return the newly created ID
SELECT
    LAST_INSERT_ID() AS orderID ;
    END //
DELIMITER
    ;
-- #####################
-- Orders UPDATE
-- #####################
-- #####################
-- Orders DELETE
-- #####################
DROP PROCEDURE IF EXISTS sp_OrdersDelete;

DELIMITER //
CREATE PROCEDURE sp_OrdersDelete(IN o_id INT)
BEGIN
    DECLARE error_message VARCHAR(255); 

    -- error handling
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Roll back the transaction on any error
        ROLLBACK;
        -- Propogate the custom error message to the caller
        RESIGNAL;
    END;

    START TRANSACTION;

        DELETE FROM Orders WHERE orderID = o_id;


        -- ROW_COUNT() returns the number of rows affected by the preceding statement.
        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in Customers for id: ', o_id);
            -- Trigger custom error, invoke EXIT HANDLER
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //
DELIMITER ;
-- #############################
-- OrderProducts 
-- #############################
-- #####################
-- OrderProducts SELECT
-- #####################
DROP PROCEDURE IF EXISTS sp_OrderProductsSelect;
DELIMITER //
CREATE PROCEDURE sp_OrderProductsSelect()
BEGIN
SELECT orderProductsID, orderID, OrderProducts.productID, Products.name, quantity, Products.price FROM OrderProducts JOIN Products ON OrderProducts.productID = Products.productID
ORDER BY OrderProducts.orderProductsID ASC;
END //
DELIMITER ;
-- #############################
-- OrderProducts Create 
-- #############################

DROP PROCEDURE IF EXISTS sp_OrderProductsCreate;

DELIMITER //

CREATE PROCEDURE sp_OrderProductsCreate(
    IN p_orderID INT(11), 
    IN p_productID INT(11), 
    IN p_quantity INT(11), 
    OUT o_id INT)
BEGIN
    DECLARE orderProductsID INT;
    INSERT INTO OrderProducts (orderID, productID, quantity) 
    VALUES (p_orderID, p_productID, p_quantity);

    -- Store the ID of the last inserted row
    SELECT LAST_INSERT_ID() into orderProductsID;
    -- Display the ID of the last inserted person.
    SELECT LAST_INSERT_ID() AS 'op_id';

END //
DELIMITER ;
-- #############################
-- OrderProducts DELETE 
-- #############################

DROP PROCEDURE IF EXISTS sp_OrderProductsDelete;

DELIMITER //
CREATE PROCEDURE sp_OrderProductsDelete(IN c_id INT)
BEGIN
    DECLARE error_message VARCHAR(255); 

    -- error handling
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Roll back the transaction on any error
        ROLLBACK;
        -- Propogate the custom error message to the caller
        RESIGNAL;
    END;

    START TRANSACTION;

        DELETE FROM OrderProducts WHERE orderProductsID = c_id;

        -- ROW_COUNT() returns the number of rows affected by the preceding statement.
        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in OrderProducts for id: ', c_id);
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //
DELIMITER ;
-- #############################
-- OrderProducts Select BY OrderID 
-- #############################

DROP PROCEDURE IF EXISTS sp_OrderProductsByOrderSelect;

DELIMITER //
CREATE PROCEDURE sp_OrderProductsByOrderSelect(IN c_id INT)
BEGIN
 
    SELECT orderProductsID, orderID, a.productID, b.Name AS productName, quantity
    FROM OrderProducts a
    
    JOIN Products b ON b.productID = a.productID
    WHERE orderID = c_id;
END //
DELIMITER ;

/*
// Implementing CUD operations in your app using stored procedures
// Citation for the following
// Date: May 26, 2026
// Adapted from 
// Source URL: https://canvas.oregonstate.edu/courses/2042369/pages/exploration-pl-slash-sql-part-2-stored-procedures-for-cud
//
*/


-- Products Select Stored Procedure
DROP PROCEDURE IF EXISTS sp_ProductsSelect;
DELIMITER //
CREATE PROCEDURE sp_ProductsSelect()
BEGIN
    SELECT 
        a.productID,
        a.manufacturerID,
        b.brandName,
        a.productType,
        a.name,
        a.price,
        a.description,
        a.SKU
    FROM Products a
    JOIN Manufacturers b
        ON a.manufacturerID = b.manufacturerID
    ORDER BY a.productID ASC;
END //
DELIMITER ;

-- Products Update Stored Procedures
DROP PROCEDURE IF EXISTS sp_ProductsUpdate;
DELIMITER //
CREATE PROCEDURE sp_ProductsUpdate(
    IN p_productID INT,
    IN p_manufacturerID INT,
    IN p_name VARCHAR(255),
    IN p_productType VARCHAR(255),
    IN p_price DECIMAL(10, 2),
    IN p_description TEXT,
    IN p_SKU VARCHAR(255)
)
BEGIN
    UPDATE Products
    SET
        manufacturerID = p_manufacturerID,
        name = p_name,
        productType = p_productType,
        price = p_price,
        description = p_description,
        SKU = p_SKU
    WHERE productID = p_productID;
END //
DELIMITER ;


-- Products Create Stored Procedure
DROP PROCEDURE IF EXISTS sp_ProductsCreate;
DELIMITER //
CREATE PROCEDURE sp_ProductsCreate(
    IN p_manufacturerID INT,
    IN p_name VARCHAR(255),
    IN p_productType VARCHAR(255),
    IN p_price DECIMAL(10, 2),
    IN p_description TEXT,
    IN p_SKU VARCHAR(255),
    OUT p_productID INT
)
BEGIN
    INSERT INTO products (manufacturerID, name, productType, price, description, SKU)
    VALUES (p_manufacturerID, p_name, p_productType, p_price, p_description, p_SKU);
    SET p_productID = LAST_INSERT_ID();
END //
DELIMITER ;

-- Products Delete Stored Procedure
DROP PROCEDURE IF EXISTS sp_ProductsDelete;
DELIMITER //
CREATE PROCEDURE sp_ProductsDelete(IN p_productID INT)
BEGIN
    DECLARE error_message VARCHAR(255);
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Roll back the transaction on any error
        ROLLBACK;
        -- Propogate the custom error message to the caller
        RESIGNAL;
    END;

    START TRANSACTION;
    
        DELETE FROM Products WHERE productID = p_productID;

        -- ROW_COUNT() returns the number of rows affected by the preceding statement.
        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in Products for id: ', p_productID);
            -- trigger custom error, invoke EXIT HANDLER
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;
END //
DELIMITER ;





-- MANUFACTURER STORED PROCEDURES

-- Manufacturers Select Stored Procedure
DROP PROCEDURE IF EXISTS sp_ManufacturersSelect;
DELIMITER //
CREATE PROCEDURE sp_ManufacturersSelect()
BEGIN
    SELECT 
        manufacturerID, 
        brandName, 
        country, 
        contactEmail, 
        contactPhone 
    FROM Manufacturers
    ORDER BY manufacturerID ASC;
END //
DELIMITER ;


-- Manufacturers Update Stored Procedure
DROP PROCEDURE IF EXISTS sp_ManufacturersUpdate;
DELIMITER //
CREATE PROCEDURE sp_ManufacturersUpdate(
    IN p_manufacturerID INT,
    IN p_brandName VARCHAR(255),
    IN p_country VARCHAR(255),
    IN p_contactEmail VARCHAR(255),
    IN p_contactPhone VARCHAR(255)
)
BEGIN
    UPDATE Manufacturers
    SET
        brandName = p_brandName,
        country = p_country,
        contactEmail = p_contactEmail,
        contactPhone = p_contactPhone
    WHERE manufacturerID = p_manufacturerID;
END //
DELIMITER ;

-- Manufacturers Create Stored Procedure
DROP PROCEDURE IF EXISTS sp_ManufacturersCreate;
DELIMITER //
CREATE PROCEDURE sp_ManufacturersCreate(
    IN p_brandName VARCHAR(255),
    IN p_country VARCHAR(255),
    IN p_contactEmail VARCHAR(255),
    IN p_contactPhone VARCHAR(255),
    OUT p_manufacturerID INT
)
BEGIN
    INSERT INTO Manufacturers (brandName, country, contactEmail, contactPhone)
    VALUES (p_brandName, p_country, p_contactEmail, p_contactPhone);
    SET p_manufacturerID = LAST_INSERT_ID();
END //
DELIMITER ; 







-- Database Reset Stored Procedure
DELIMITER //
CREATE PROCEDURE DatabaseReset()

BEGIN
    SET FOREIGN_KEY_CHECKS = 0;
    SET autocommit = 0;

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

    COMMIT;
    SET FOREIGN_KEY_CHECKS = 1;
    SET autocommit = 1;

END //
DELIMITER ;