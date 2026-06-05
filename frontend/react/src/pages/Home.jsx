



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
                    <li>OrderProducts - M:N table, Admin for direct OrderProducts Table</li>
                </ul>
                <div>
                    <h1>Step 5 Final Feature Description</h1>
                    <ul>
                        
                        <li>Orders/Customers/Manufacturers/Products/OrderProducts all CRUD actions work and use stored procedure calls from the API.</li>
                        <li>The application has been tested with the Browers (FireFox) and confirm to work as expected.</li>
                        <li>The react state is rudimentary and the back button is not guaranteed to work as expected. Navigating backwords using the navigation is best.</li>
                        <li>Reset DB navigation option to navigate to the reset the backend database.</li>
                    </ul>
 
                </div>
            </div>
            


        </>
    )
};
export default Home;