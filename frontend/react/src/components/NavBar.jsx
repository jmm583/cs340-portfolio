import React from 'react';
import { Link } from 'react-router';

function NavBar() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/customers">Customers</Link></li>
                <li><Link to="/manufacturers">Manufacturers</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/producttypes">Product Types</Link></li>
                <li><Link to="/statuses">Statuses</Link></li>
                <li><Link to="/orders">Orders</Link></li>
                <li><Link to="/ordersstatuses">Order Statuses</Link></li>
                <li><Link to="/orderproducts">Order Products</Link></li>
                
            </ul>
        </nav>
    );
};

export default NavBar;