-- Statuses Table
--Select
SELECT statusID, statusName FROM Statuses
--Insert values
INSERT INTO Statuses (statusName) VALUES (:statusName)
--Delete row
DELETE FROM Statuses WHERE statusName = :statusName
-- Update row
UPDATE Statuses set statusName WHERE statusID = :statusID

--Customers Table
-- Select
SELECT firstName, lastName, email, phone FROM Customers
-- INSERT INTO
INSERT INTO Customers (firstName, lastName, email, phone) VALUES (:firstName, :lastName, :email, :phone )
--update
UPDATE Customers set firstName = :firstName, lastName=:lastName, email=:email, phone=:phone where email = :email
--Delete
DELETE FROM Customers where email=:email

--Orders Table
-- select
SELECT orderID, customerID, firstName, lastName, complete, totalCost FROM Orders JOIN Customers ON Order.customerID = Customers.customerID
-- insert
INSERT INTO Orders (customerID, complete, totalCost) VALUES(:customerID, :complete, :totalCost)
-- update
UPDATE Orders set customerID=:customerID, complete=:complete, totalCost=:totalCost WHERE orderID=:orderID
-- delete
DELETE FROM Orders where orderID=:orderID

--OrderProducts table
--select
SELECT orderProductsID, orderID, productID, Products.name, quantity, Products.price FROM OrderProducts JOIN Products ON OrderProducts.productID = Products.productID
--insert into
INSERT INTO OrderProducts (orderID, productID, quantity) VALUES (:orderID, :productID, :quantity)
--update
UPDATE OrderProducts set orderID = :orderID, productID=:productID, quantity=:quantity WHERE orderProductsID=:orderProductsID
--delete
DELETE FROM OrderProducts WHERE orderProductsID=:orderProductsID

--Order Statuses table
--select
SELECT orderStatusID, orderID, statusID, statusName, statusDate FROM OrderStatuses JOIN Statuses ON OrderStatuses.statusID = Statuses.statusID
--insert into
INSERT INTO OrderStatuses (orderID, statusID, statusDate) VALUES (:orderID, :statusID, :statusDate)
--update
UPDATE OrderStatuses set orderID=:orderID, statusID=:statusID, statusDate=:statusDate where orderStatusID = :orderStatusID
--delete
DELETE FROM OrderStatuses where orderStatusID = :orderStatusID

--Manufacturers table
--select
SELECT manufacturerID, brandName, country, contactEmail, contactPhone FROM Manufacturers
--insert into
INSERT INTO Manufacturers (brandName, country, contactEmail, contactPhone) VALUES (:brandName, :country, :contactEmail, :contactPhone)
--update 
UPDATE Manufacturers set brandName = :brandName, country=:country, contactEmail=:contactEmail, contactPhone=:contactPhone WHERE manufacturerID=:manufacturerID 
--delete
DELETE FROM Manufacturers WHERE manufacturerID = :manufacturerID

-- Products table
--select
SELECT productID, manufacturerID, brandName, productTypeID, name, price, description, SKU FROM Products JOIN Manufacturers ON Products.manufacturerID=Manufacturers.manufacturerID
--insert into
INSERT INTO Products (manufacturerID, productTypeID, name, price, description, SKU) VALUES (:manufacturerID, :productTypeID, :name, :price, :description, :SKU)
--update
UPDATE Products set manufacturerID=:manufacturerID, productTypeID=:productTypeID, name=:name, price=:price, description=:description, SKU=:SKU WHERE productID=:productID
--delete
DELETE FROM Products WHERE productID=:productID

-- ProductTypes table
--select
SELECT productTypeID, typeName from ProductTypes
--insert into
INSERT INTO ProductTypes (typeName) VALUES (:typeName)
--update
UPDATE ProductTypes set typeName=:typeName WHERE productTypeID = :productTypeID
--delete
DELETE FROM ProductTypes WHERE productTypeID = :productTypeID