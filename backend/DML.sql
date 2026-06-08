-- Project: NobleGoldFish
-- Group 13 -LuckyNumber13
-- Group Members Jon Marchand, Joshua York  
-- Date: Apr 30 2026
-- Description: Data manipulation queries.
-- No AI was used for this file.

--Customers Table
-- Select
SELECT firstName, lastName, email, phone FROM Customers
-- INSERT INTO
INSERT INTO Customers (firstName, lastName, email, phone) VALUES (@firstName, @lastName, @email, @phone )
--update
UPDATE Customers SET firstName = @firstName, lastName=@lastName, email=@email, phone=@phone WHERE customerID=@customerID
--Delete
DELETE FROM Customers WHERE customerID=@customerID

--Orders Table
-- select
SELECT orderID, Orders.customerID, firstName, lastName, complete, totalCost, statusName, statusDate FROM Orders JOIN Customers ON Orders.customerID = Customers.customerID
-- insert
INSERT INTO Orders (customerID, complete, totalCost, statusName, statusDate) VALUES(@customerID, @complete, @totalCost, @statusName, @statusDate)
-- update
UPDATE Orders SET customerID=@customerID, complete=@complete, totalCost=@totalCost, statusName=@statusName, statusDate=@statusDate WHERE orderID=@orderID
-- delete
DELETE FROM Orders WHERE orderID=@orderID

--OrderProducts table
--select
SELECT orderProductsID, orderID, OrderProducts.productID, Products.name, quantity, Products.price FROM OrderProducts JOIN Products ON OrderProducts.productID = Products.productID
--insert into
INSERT INTO OrderProducts (orderID, productID, quantity) VALUES (@orderID, @productID, @quantity)
--update
UPDATE OrderProducts SET orderID = @orderID, productID=@productID, quantity=@quantity WHERE orderProductsID=@orderProductsID
--delete
DELETE FROM OrderProducts WHERE orderProductsID=@orderProductsID


--Manufacturers table
--select
SELECT manufacturerID, brandName, country, contactEmail, contactPhone FROM Manufacturers
--insert into
INSERT INTO Manufacturers (brandName, country, contactEmail, contactPhone) VALUES (@brandName, @country, @contactEmail, @contactPhone)
--update 
UPDATE Manufacturers SET brandName = @brandName, country=@country, contactEmail=@contactEmail, contactPhone=@contactPhone WHERE manufacturerID=@manufacturerID 
--delete
DELETE FROM Manufacturers WHERE manufacturerID = @manufacturerID

-- Products table
--select
SELECT productID, Products.manufacturerID, brandName, productType, name, price, description, SKU FROM Products JOIN Manufacturers ON Products.manufacturerID=Manufacturers.manufacturerID
--insert into
INSERT INTO Products (manufacturerID, productType, name, price, description, SKU) VALUES (@manufacturerID, @productType, @name, @price, @description, @SKU)
--update
UPDATE Products SET manufacturerID=@manufacturerID, productType=@productType, name=@name, price=@price, description=@description, SKU=@SKU WHERE productID=@productID
--delete
DELETE FROM Products WHERE productID=@productID
