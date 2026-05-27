import React from 'react';
import { Link } from 'react-router';

function NavBar() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                {/* <li><Link to="/ordersstatuses">OrderStatuses</Link></li>
                <li><Link to="/statuses">Statuses</Link></li>
                <li><Link to="/producttypes">ProductTypes</Link></li> */}
                <li><Link to="/manufacturers">Manufacturers</Link></li>
                <li><Link to="/products">Products</Link></li>
                
                <li><Link to="/customers">Customers</Link></li>
                <li><Link to="/orders">Orders</Link></li>

                <li><Link to="/orderproducts">OrderProducts</Link></li>
                <li><Link to="/reset">Reset DB</Link></li>
                
                {/* Add a link for the DB reset */}
                <li><a href="/dbreset" onClick={(e) => {
                    e.preventDefault();
                    fetch('http://localhost:3000/dbreset')
                        .then(response => response.json())
                        .then(data => { console.log(data.message); window.location.reload(); })
                    .catch(error => { console.error("Error resetting database:", error); alert("An error occurred while resetting the database."); });
                }}>DB Reset</a></li>

            </ul>
        </nav>
    );
};

export default NavBar;