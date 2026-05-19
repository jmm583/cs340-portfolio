



function Home() {


    return (
        <>
            <div className='main'>
            <h1>Home Page</h1>
            
                <p>Welcome to the NobleGoldfish Admin site.</p>
                <ul>
                    <li>Manufacturers - Admin for Manufacturers table</li>
                    <li>Products - Admin for Products table</li>
                    <li>Customers - Admin for Customers table</li>
                    <li>Orders - Admin for Orders table</li>
                    <li>OrderProducts - Admin for direct OrderProducts Table</li>
                </ul>
                <div>
                    <h1>Change log</h1>
                    <h2>Step 4 Draft</h2>
                    <ul>
                        
                        <li>Updated Orders/Customers to use "SELECT" stored procedure calls from the API.</li>
                        <li>Updated Orders/Customers to use "DELETE" stored procedure calls from the API.</li>
                        <li>Updated Reset DB navigation option and page to reset backend database.</li>
                    </ul>
 
                </div>
            </div>
            


        </>
    )
};
export default Home;