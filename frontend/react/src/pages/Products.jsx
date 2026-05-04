


function Products() {
    return (
        <div>
            <form>
                <label htmlFor="productID">productID:</label>
                <input name="productID" type="number"  />
                <label htmlFor="manufacturerID">manufacturerID:</label>
                <input name="manufacturerID" type="number"  />
                <label htmlFor="productTypeID">productTypeID:</label>
                <input name="productTypeID" type="number"  />
                <label htmlFor="name">name:</label>
                <input type="text" name="name" />

                <label htmlFor="price">price:</label>
                <input name="price" type="number"  />
                <label htmlFor="description">description:</label>
                <input type="text" name="description" />
                <label htmlFor="SKU">SKU:</label>
                <input name="SKU" type="text"  />
            </form>

        </div>
    )
}; 


export default Products;
