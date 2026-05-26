
import { useState, useEffect } from "react";
import { getManufacturers } from "../../components/apiClient";

function ProductsEdit({itemToEdit}) {

    // const [productID, setProductID] = useState(itemToEdit.productID);
    // // drop down for manufacturer
    // const [manufacturerID, setManufacturerID] = useState(itemToEdit.manufacturerID); 
    // const [name, setName] = useState(itemToEdit.name);
    // const [productType, setProductType] = useState(itemToEdit.productType);
    // const [price, setPrice] = useState(itemToEdit.price);
    // const [description, setDescription] = useState(itemToEdit.description);
    // const [SKU, setSKU] = useState(itemToEdit.SKU);

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

    const onSubmit = (e) => {
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
            fetch(`http://localhost:3000/products/${productID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        } catch (error) {
            console.error("Error updating product:", error);
        }       
    }
    return (
        <div className='main'>
            <h1>Edit Products</h1>
            <form onSubmit={onSubmit}>
                
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
                    <label htmlFor="productType">productType:</label>
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