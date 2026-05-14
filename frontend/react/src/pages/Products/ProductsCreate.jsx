
import { useState } from "react";
import { getManufacturers, createProduct } from "../../components/apiClient";
import { useNavigate } from "react-router";

function ProductsCreate() {
    const navigate = useNavigate();
    const [productID, setProductID] = useState();
    const [manufacturerID, setManufacturerID] = useState();
    const [name, setName] = useState();
    const [productType, setProductType] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [SKU, setSKU] = useState();


    const manufacturers = getManufacturers();
    const setManufacturer = (e) => {
        setManufacturerID(e.target.value);
    }
    const onSubmit = (e) => {
        const ID = -1;
        e.preventDefault();
        createProduct(ID, manufacturerID, name, productType, price, SKU );
        navigate("/products")

    }
    return (
        <div className='main'>
            <h1>Add Product</h1>
            <form onSubmit={onSubmit}>
                {/* <label htmlFor="productID">productID:</label>
                <input name="productID" type="number" value={productID} onChange={setProductID} /> */}
               
                <div className="form-group">
                    <label htmlFor="manufacturerID">Manufacturer:</label>
                    {/* <input name="manufacturerID" type="number" value={manufacturerID} onChange={setManufacturerID} /> */}
                    <select onChange={setManufacturer}>
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