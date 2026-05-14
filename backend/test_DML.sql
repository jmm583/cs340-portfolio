-- Test Scripts


-- ======================
-- Customers INSERT
-- ======================
SET @firstName = 'John';
SET @lastName  = 'Doe';
SET @email     = 'john.doe@example.com';
SET @phone     = '555-123-4567';
INSERT INTO Customers (firstName, lastName, email, phone) VALUES (@firstName, @lastName, @email, @phone );

-- ======================
-- Customers UPDATE
-- ======================
SET @firstName = 'John';
SET @lastName  = 'Test';
SET @email     = 'john.doe@example.com';
SET @phone     = '555-123-4567';
UPDATE Customers SET firstName = @firstName, lastName=@lastName, email=@email, phone=@phone WHERE email = @email;

-- ======================
-- Customers DELETE
-- ======================
SET @email     = 'john.doe@example.com';
DELETE FROM Customers WHERE email=@email

-- Orders
-- Orders Table

-- ======================
-- Orders INSERT
-- ======================


SET @customerID = 1;
SET @complete = 0;
SET @totalCost = 149.99;

INSERT INTO Orders (customerID, complete, totalCost)
VALUES (@customerID, @complete, @totalCost);


-- ======================
-- Orders UPDATE
-- ======================


SET @orderID = 1;
SET @customerID = 1;
SET @complete = 1;
SET @totalCost = 199.99;

UPDATE Orders
SET customerID = @customerID,
    complete   = @complete,
    totalCost  = @totalCost
WHERE orderID = @orderID;


-- ======================
-- Orders DELETE
-- ======================


SET @orderID = 1;

DELETE FROM Orders
WHERE orderID = @orderID;

-- OrderProducts
-- ======================
-- OrderProducts INSERT
-- ======================


SET @orderID = 2;
SET @productID = 1;
SET @quantity = 3;

INSERT INTO OrderProducts (orderID, productID, quantity)
VALUES (@orderID, @productID, @quantity);


-- ======================
-- OrderProducts UPDATE
-- ======================


SET @orderProductsID = 1;
SET @orderID = 2;
SET @productID = 1;
SET @quantity = 5;

UPDATE OrderProducts
SET orderID   = @orderID,
    productID = @productID,
    quantity  = @quantity
WHERE orderProductsID = @orderProductsID;


-- ======================
-- OrderProducts DELETE
-- ======================

SET @orderProductsID = 1;

DELETE FROM OrderProducts
WHERE orderProductsID = @orderProductsID;


-- Manufacturers
-- ======================
-- Manufacturers INSERT
-- ======================


SET @brandName = 'Acme Corporation';
SET @country = 'USA';
SET @contactEmail = 'contact@acme.com';
SET @contactPhone = '555-987-6543';

INSERT INTO Manufacturers (brandName, country, contactEmail, contactPhone)
VALUES (@brandName, @country, @contactEmail, @contactPhone);


-- ======================
-- Manufacturers UPDATE
-- ======================


SET @manufacturerID = 4;
SET @brandName = 'Acme Industries';
SET @country = 'Canada';
SET @contactEmail = 'support@acme.com';
SET @contactPhone = '555-111-2222';

UPDATE Manufacturers
SET brandName     = @brandName,
    country       = @country,
    contactEmail  = @contactEmail,
    contactPhone  = @contactPhone
WHERE manufacturerID = @manufacturerID;


-- ======================
-- Manufacturers DELETE
-- ======================


SET @manufacturerID = 4;

DELETE FROM Manufacturers
WHERE manufacturerID = @manufacturerID;

--Products
-- ======================
--  Products INSERT
-- ======================


SET @manufacturerID = 3;
SET @productTypeID = 2;
SET @name = 'Wireless Keyboard';
SET @price = 49.99;
SET @description = 'Compact wireless keyboard with ergonomic design';
SET @SKU = 'WK-1001';

INSERT INTO Products (manufacturerID, productTypeID, name, price, description, SKU)
VALUES (@manufacturerID, @productTypeID, @name, @price, @description, @SKU);


-- ======================
--  Products UPDATE
-- ======================


SET @productID = 12;
SET @manufacturerID = 4;
SET @productType = 'deck';
SET @name = 'Mechanical Wireless Keyboard';
SET @price = 79.99;
SET @description = 'Mechanical wireless keyboard with backlit keys';
SET @SKU = 'MWK-2002';

UPDATE Products
SET manufacturerID = @manufacturerID,
    productTypeID  = @productType,
    name           = @name,
    price          = @price,
    description    = @description,
    SKU            = @SKU
WHERE productID = @productID;


-- ======================
-- Products DELETE
-- ======================


SET @productID = 4;

DELETE FROM Products
WHERE productID = @productID;

