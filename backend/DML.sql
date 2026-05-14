

--Customers Table
-- Select
SELECT firstName as "First Name", lastName as "Last Name", email as "Email", phone as "Phone" FROM Customers
-- INSERT INTO
INSERT INTO Customers (firstName, lastName, email, phone) VALUES (@firstName, @lastName, @email, @phone )
--update
UPDATE Customers SET firstName = @firstName, lastName=@lastName, email=@email, phone=@phone WHERE email = @email
--Delete
DELETE FROM Customers WHERE email=@email

--Orders Table
-- select
SELECT orderID as "Order ID", customerID as "Customer ID", firstName as "First Name", lastName as "Last Name", complete as "Complete", totalCost as "Total Cost", statusName as "Status Name", statusDate as "Status Date" FROM Orders JOIN Customers ON Orders.customerID = Customers.customerID
-- insert
INSERT INTO Orders (customerID, complete, totalCost) VALUES(@customerID, @complete, @totalCost)
-- update
UPDATE Orders SET customerID=@customerID, complete=@complete, totalCost=@totalCost WHERE orderID=@orderID
-- delete
DELETE FROM Orders WHERE orderID=@orderID

--OrderProducts table
--select
SELECT orderProductsID as "Order Products ID", orderID as "Order ID", productID as "Product ID", Products.name as "Product Name", quantity as "Quantity", Products.price as "Price" FROM OrderProducts JOIN Products ON OrderProducts.productID = Products.productID
--insert into
INSERT INTO OrderProducts (orderID, productID, quantity) VALUES (@orderID, @productID, @quantity)
--update
UPDATE OrderProducts SET orderID = @orderID, productID=@productID, quantity=@quantity WHERE orderProductsID=@orderProductsID
--delete
DELETE FROM OrderProducts WHERE orderProductsID=@orderProductsID


--Manufacturers table
--select
SELECT manufacturerID as "Manufacturer ID", brandName as "Brand Name", country as "Country", contactEmail as "Contact Email", contactPhone as "Contact Phone" FROM Manufacturers
--insert into
INSERT INTO Manufacturers (brandName, country, contactEmail, contactPhone) VALUES (@brandName, @country, @contactEmail, @contactPhone)
--update 
UPDATE Manufacturers SET brandName = @brandName, country=@country, contactEmail=@contactEmail, contactPhone=@contactPhone WHERE manufacturerID=@manufacturerID 
--delete
DELETE FROM Manufacturers WHERE manufacturerID = @manufacturerID

-- Products table
--select
SELECT productID as "Product ID", manufacturerID as "Manufacturer ID", brandName as "Brand Name", productType as "Product Type", name as "Name", price as "Price", description as "Description", SKU as "SKU" FROM Products JOIN Manufacturers ON Products.manufacturerID=Manufacturers.manufacturerID
--insert into
INSERT INTO Products (manufacturerID, productType, name, price, description, SKU) VALUES (@manufacturerID, @productType, @name, @price, @description, @SKU)
--update
UPDATE Products SET manufacturerID=@manufacturerID, productType=@productType, name=@name, price=@price, description=@description, SKU=@SKU WHERE productID=@productID
--delete
DELETE FROM Products WHERE productID=@productID
