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
        -- Deleting corresponding rows from both bsg_people table and 
        --      intersection table to prevent a data anamoly
        -- This can also be accomplished by using an 'ON DELETE CASCADE' constraint
        --      inside the bsg_cert_people table.
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
        -- Deleting corresponding rows from both bsg_people table and 
        --      intersection table to prevent a data anamoly
        -- This can also be accomplished by using an 'ON DELETE CASCADE' constraint
        --      inside the bsg_cert_people table.
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
-- OrderProducts DELETE 
-- #############################
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
        -- Deleting corresponding rows from both bsg_people table and 
        --      intersection table to prevent a data anamoly
        -- This can also be accomplished by using an 'ON DELETE CASCADE' constraint
        --      inside the bsg_cert_people table.
        DELETE FROM OrderProducts WHERE orderProductsID = c_id;


        -- ROW_COUNT() returns the number of rows affected by the preceding statement.
        IF ROW_COUNT() = 0 THEN
            set error_message = CONCAT('No matching record found in OrderProducts for id: ', c_id);
            -- Trigger custom error, invoke EXIT HANDLER
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;

    COMMIT;

END //
DELIMITER ;