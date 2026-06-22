import React from 'react';
import { Link } from 'react-router';

function NavBar() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>

                <li><Link to="/manufacturers">Manufacturers</Link></li>
                <li><Link to="/products">Products</Link></li>
                
                <li><Link to="/customers">Customers</Link></li>
                <li><Link to="/orders">Orders</Link></li>

                <li><Link to="/orderproducts">OrderProducts</Link></li>
                <li><Link to="/reset">Reset DB</Link></li>

            </ul>
        </nav>
    );
};

export default NavBar;