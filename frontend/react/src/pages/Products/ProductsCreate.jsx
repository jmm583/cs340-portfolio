/*
// Using react select component for manufacturer dropdown in product create form
// Unless a prepopulated value is actually clicked the default value of form field is undefined
// Adding and option creates a component in the form that updates the state when the user selects an option.
// Citation for the following
// Date: May 26, 2026
// Adapted from 
// Source URL: https://react.dev/reference/react-dom/components/select
//
*/


import { useState, useEffect } from "react";
import { getManufacturers, createProduct } from "../../components/apiClient";
import { useNavigate } from "react-router";

function ProductsCreate() {
    const navigate = useNavigate("");
    const [productID, setProductID] = useState("");
    const [manufacturerID, setManufacturerID] = useState("");
    const [name, setName] = useState("");
    const [productType, setProductType] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [SKU, setSKU] = useState("");


    const [manufacturers, setManufacturers] = useState([]);
    
    useEffect(() => {
        const loadManufacturers = async () => {
            const data = await getManufacturers();
            setManufacturers(data);
        };
        loadManufacturers();
    }, []);

    const setManufacturer = (e) => {
        setManufacturerID(e.target.value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const newProduct = {
            manufacturerID, 
            name, 
            productType, 
            price, 
            description, 
            SKU
        };
        console.log("created product", newProduct); 
        try {
            const response = await fetch(
                `http://localhost:3000/products`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newProduct),
                }
            );

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            navigate('/products');
        } catch (error) {
            console.error("Error creating product:", error);
            alert("An error occurred while creating the product. Please try again.");
        }   
    }
    return (
        <div className='main'>
            <h1>Add Product</h1>
            <form action="/products" method="POST" onSubmit={onSubmit}>
                {/* <label htmlFor="productID">productID:</label>
                <input name="productID" type="number" value={productID} onChange={setProductID} /> */}
               
                <div className="form-group">
                    <label htmlFor="manufacturerID">Manufacturer:</label>
                    {/* <input name="manufacturerID" type="number" value={manufacturerID} onChange={setManufacturerID} /> */}
                    <select value={manufacturerID} onChange={setManufacturer}>
                        <option value="">select a manufacturer</option>
                        {manufacturers.map((manufacturer) => (
                            <option key={manufacturer.manufacturerID} value={manufacturer.manufacturerID}>
                            {manufacturer.brandName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="productType">Type:</label>
                    <input name="productType" type="text" value={productType} onChange={e=> setProductType(e.target.value)}   />

                
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" value={name} onChange={e => setName(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input name="price" type="number" value={price} onChange={e => setPrice(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input type="text" name="description" value={description} onChange={e => setDescription(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="SKU">SKU:</label>
                    <input name="SKU" type="text" value={SKU} onChange={e => setSKU(e.target.value)} />
                </div>
                <div className="form-group actions">
                    <button type="submit">Save</button>
                </div>
            </form>

        </div>
    )
}; 


export default ProductsCreate;