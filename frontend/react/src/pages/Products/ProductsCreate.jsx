
import { useState } from "react";
import { getProductTypes, getManufacturers, createProduct } from "../../components/apiClient";
import { useNavigate } from "react-router";

function ProductsCreate() {
    const navigate = useNavigate();
    const [productID, setProductID] = useState();
    const [manufacturerID, setManufacturerID] = useState();
    const [name, setName] = useState();
    const [productTypeID, setProductTypeID] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [SKU, setSKU] = useState();
    const productTypes = getProductTypes();
    const setProductType = (e) => {
        setProductTypeID(e.target.value)
    };
    const manufacturers = getManufacturers();
    const setManufacturer = (e) => {
        setManufacturerID(e.target.value);
    }
    const onSubmit = (e) => {
        const ID = -1;
        e.preventDefault();
        createProduct(ID, manufacturerID, name, productTypeID, price, SKU );
        navigate("/products")

    }
    return (
        <div><h1>Add Product</h1>
            <form onSubmit={onSubmit}>
                {/* <label htmlFor="productID">productID:</label>
                <input name="productID" type="number" value={productID} onChange={setProductID} /> */}

                <label htmlFor="manufacturerID">manufacturerID:</label>
                {/* <input name="manufacturerID" type="number" value={manufacturerID} onChange={setManufacturerID} /> */}
                <select onChange={setManufacturer}>
                    {manufacturers.map((manufacturer) => (
                        <option key={manufacturer.manufacturerID} value={manufacturer.manufacturerID}>
                        {manufacturer.brandName}
                        </option>
                    ))}
                </select>

                <label htmlFor="productTypeID">productTypeID:</label>
                {/* <input name="productTypeID" type="number" value={productTypeID}  /> */}
                <select onChange={setProductType}>
                    {productTypes.map((productType) => (
                        <option key={productType.productTypeID} value={productType.productTypeID}>
                        {productType.typeName}
                        </option>
                    ))}
                </select>

                <label htmlFor="name">name:</label>
                <input type="text" name="name" value={name} onChange={e => setName(e.target.value)}/>

                <label htmlFor="price">price:</label>
                <input name="price" type="number" value={price} onChange={e => setPrice(e.target.value)} />

                <label htmlFor="description">description:</label>
                <input type="text" name="description" value={description} onChange={e => setDescription(e.target.value)} />

                <label htmlFor="SKU">SKU:</label>
                <input name="SKU" type="text" value={SKU} onChange={e => setSKU(e.target.value)} />
                <button type="submit">Save</button>
            </form>

        </div>
    )
}; 


export default ProductsCreate;