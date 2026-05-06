
import { useState } from "react";

function ProductsEdit({itemToEdit}) {
    const [productID, setProductID] = useState(itemToEdit.productID);
    const [manufacturerID, setManufacturerID] = useState(itemToEdit.manufacturerID);
    const [name, setName] = useState(itemToEdit.name);
    const [productTypeID, setProductTypeID] = useState(itemToEdit.productTypeID);
    const [price, setPrice] = useState(itemToEdit.price);
    const [description, setDescription] = useState(itemToEdit.description);
    const [SKU, setSKU] = useState(itemToEdit.SKU);
    return (
        <div>
            <form>
                <label htmlFor="productID">productID:</label>
                <input name="productID" type="number" value={productID} onChange={setProductID} />

                <label htmlFor="manufacturerID">manufacturerID:</label>
                <input name="manufacturerID" type="number" value={manufacturerID} onChange={setManufacturerID} />

                <label htmlFor="productTypeID">productTypeID:</label>
                <input name="productTypeID" type="number" value={productTypeID} onChange={setProductTypeID} />

                <label htmlFor="name">name:</label>
                <input type="text" name="name" value={name} onChange={setName}/>

                <label htmlFor="price">price:</label>
                <input name="price" type="number" value={price} onChange={setPrice} />

                <label htmlFor="description">description:</label>
                <input type="text" name="description" value={description} onChange={setDescription} />

                <label htmlFor="SKU">SKU:</label>
                <input name="SKU" type="text" value={SKU} onChange={setSKU} />
                <button>Save</button>
            </form>

        </div>
    )
}; 


export default ProductsEdit;