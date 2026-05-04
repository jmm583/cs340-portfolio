import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from './pages/Home';

import Manufacturers from './pages/Manufacturers';
import Products  from './pages/Products';
import ProductTypes from './pages/ProductTypes';
import Customers from './pages/Customers/Customers';
import Statuses from './pages/Statuses/Statuses';
import Orders from './pages/Orders/Orders';
import OrderStatuses from './pages/OrderStatuses/OrderStatuses';
import OrderProducts from './pages/OrderProducts/OrderProducts';
import NavBar from './components/NavBar';




function App() {

  return (
    <>
      <header>
        <h1>NobleGoldFish Skate Shop Portal</h1>
        <p>DBMS</p>
      </header>
      <div className='app'>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/customers" element={<Customers/>}></Route>
            <Route path="/products" element={<Products/>}></Route>
            <Route path="/manufacturers" element={<Manufacturers/>}></Route>
            <Route path="/statuses" element={<Statuses />}></Route>
            <Route path="/producttypes" element={<ProductTypes />}></Route>
            <Route path="/orders" element={<Orders />}></Route>
            <Route path="/ordersstatuses" element={<OrderStatuses />}></Route>
            <Route path="/orderproducts" element={<OrderProducts />}></Route>

          </Routes>
        </Router>
      </div>
      <footer>
        <p>&copy; 2026 Group 13 Lucknumber13 Joshua York, Jonathan Marchand</p>
      </footer>
    </>

  );

} export default App;