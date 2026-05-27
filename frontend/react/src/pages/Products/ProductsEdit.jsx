
import { useState, useEffect } from "react";
import { getManufacturers, updateProduct } from "../../components/apiClient";
import { useNavigate } from 'react-router';


function ProductsEdit({itemToEdit}) {
    // use itemToEdit's value if available otherwise return empty string
    const [productID, setProductID] = useState(itemToEdit?.productID || '');
    const [manufacturerID, setManufacturerID] = useState(itemToEdit?.manufacturerID || '');
    const [name, setName] = useState(itemToEdit?.name || '');
    const [productType, setProductType] = useState(itemToEdit?.productType || '');
    const [price, setPrice] = useState(itemToEdit?.price || '');
    const [description, setDescription] = useState(itemToEdit?.description || '');
    const [SKU, setSKU] = useState(itemToEdit?.SKU || '');

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

    const navigate = useNavigate();

    const onSubmit = async(e) => {
        e.preventDefault();

        const updatedProduct = {
            productID,
            manufacturerID,
            name,
            productType,
            price,
            description,
            SKU
        };
        console.log("updated product", updatedProduct);

        try { 
            await updateProduct(updatedProduct);
            navigate('/products');

        } catch (error) {
            console.error("Error updating product:", error)
            alert("An error occurred while updating the product. Please try again.");
        }       
    };

    return (
        <div className='main'>
            <h1>Edit Products</h1>
            <form action={`/products/${productID}`} method="POST" onSubmit={onSubmit}>
                
                {/* <div className="form-group">
                    <label htmlFor="productID">productID:</label>
                    <input name="productID" type="number" value={productID} onChange={setProductID} />
                </div> */}
                <div className="form-group">
                    <label htmlFor="manufacturerID">Manufacturer:</label>
                    {/* <input name="manufacturerID" type="number" value={manufacturerID} onChange={setManufacturerID} /> */}
                    <select onChange={setManufacturer} value={manufacturerID}>
                        {manufacturers.map((manufacturer) => (
                            <option key={manufacturer.manufacturerID} value={manufacturer.manufacturerID}>
                            {manufacturer.brandName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="productType">Product Type:</label>
                    <input name="productType" type="text" value={productType} onChange={e => setProductType(e.target.value)} />

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
                <div className="form-group">
                    <button>Save</button>
                </div>
            </form>

        </div>
    )
}; 


export default ProductsEdit;