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
DROP PROCEDURE IF EXISTS sp_CustomersUpdate;
DELIMITER //

CREATE PROCEDURE sp_CustomersUpdate (
    IN p_customerID VARCHAR(254), 
    IN p_firstName VARCHAR(50), 
    IN p_lastName VARCHAR(50), 
    IN p_new_email VARCHAR(254), 
    IN p_phone VARCHAR(20)
    
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT 'Error occurred. Transaction rolled back.' AS message;
    END;

    START TRANSACTION;

    UPDATE Customers
    SET 
        firstName = p_firstName,
        lastName = p_lastName,
        email = p_new_email,
        phone = p_phone
    WHERE customerID = p_customerID;

    IF ROW_COUNT() = 0 THEN
        ROLLBACK;
        SELECT 'No customer found. No changes made.' AS message;
    ELSE
        COMMIT;
        SELECT 'Customer updated successfully.' AS message;
    END IF;

END //

DELIMITER ;
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

    IN p_customerID INT,
    IN p_complete BOOLEAN,
    IN p_totalCost DECIMAL(12, 2),
    IN p_statusDate DATETIME,
    IN p_statusName VARCHAR(50),
    OUT p_orderID INT
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
    );
    
    -- Display the ID of the last inserted person.
    SELECT LAST_INSERT_ID() INTO p_orderID;
    END //
DELIMITER ;
-- #####################
-- Orders UPDATE
-- #####################
DROP PROCEDURE IF EXISTS sp_OrdersUpdate;

DELIMITER //
CREATE PROCEDURE sp_OrdersUpdate(
    IN p_orderID INT,
    IN p_customerID INT,
    IN p_complete BOOLEAN,
    IN p_totalCost DECIMAL(12, 2),
    IN p_statusDate DATETIME,
    IN p_statusName VARCHAR(50)
)
BEGIN

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT 'Error occurred. Transaction rolled back.' AS message;
    END;

    START TRANSACTION;
    
    UPDATE Orders
    SET
 
        complete = p_complete,
        totalCost = p_totalCost,
        statusDate = p_statusDate,
        statusName = p_statusName
    WHERE orderID = p_orderID;
    
    IF ROW_COUNT() = 0 THEN
        ROLLBACK;
        SELECT 'No order found. No changes made.' AS message;
    ELSE
        COMMIT;
        SELECT 'Order updated successfully.' AS message;
    END IF;

END //

DELIMITER ;

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
    OUT op_id INT)
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
-- OrderProducts UPDATE 
-- #############################
DROP PROCEDURE IF EXISTS sp_OrderProductsUpdate;

DELIMITER //
CREATE PROCEDURE sp_OrderProductsUpdate(
    IN p_orderProductsID INT(11), 
    IN p_orderID INT(11), 
    IN p_productID INT(11), 
    IN p_quantity INT(11)
)
BEGIN

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT 'Error occurred. Transaction rolled back.' AS message;
    END;

    START TRANSACTION;
    
    UPDATE OrderProducts
    SET
        productID = p_productID,
        quantity = p_quantity
    WHERE orderProductsID = p_orderProductsID;
    
    IF ROW_COUNT() = 0 THEN
        ROLLBACK;
        SELECT 'No orderproduct found. No changes made.' AS message;
    ELSE
        COMMIT;
        SELECT 'OrderProducts updated successfully.' AS message;
    END IF;

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
    INSERT INTO Products (manufacturerID, name, productType, price, description, SKU)
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


-- Manufacturers Delete Stored Procedure
DROP PROCEDURE IF EXISTS sp_ManufacturersDelete;
DELIMITER //
CREATE PROCEDURE sp_ManufacturersDelete(IN p_manufacturerID INT)
BEGIN
    DECLARE error_message VARCHAR(255);
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    START TRANSACTION;
        DELETE FROM Manufacturers WHERE manufacturerID = p_manufacturerID;
        
        IF ROW_COUNT() = 0 THEN
            SET error_message = CONCAT(
                'No matching record found in Manufacturers for id: ', p_manufacturerID);
            SIGNAL SQLSTATE '45000' 
            SET MESSAGE_TEXT = error_message;
        END IF;
    COMMIT;
END //
DELIMITER ;