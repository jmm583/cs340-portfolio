import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router";
import { useState } from 'react';
import Home from './pages/Home';

import Manufacturers from './pages/Manufacturers/Manufacturers';
import ManufacturersEdit from './pages/Manufacturers/ManufacturersEdit';
import ManufacturersCreate from './pages/Manufacturers/ManufacturersCreate';

import Products  from './pages/Products/Products';
import ProductsEdit  from './pages/Products/ProductsEdit';
import ProductsCreate  from './pages/Products/ProductsCreate';



import Customers from './pages/Customers/Customers';
import CustomerEdit from './pages/Customers/CustomerEdit';
import CustomerCreate from './pages/Customers/CustomerCreate';



import Orders from './pages/Orders/Orders';
import OrderEdit from './pages/Orders/OrderEdit';
import OrderCreate from './pages/Orders/OrderCreate';

import ResetDB from './pages/ResetDB';

// import ProductTypes from './pages/ProductTypes/ProductTypes';
// import ProductTypesEdit from './pages/ProductTypes/ProductTypesEdit';
// import ProductTypesCreate from './pages/ProductTypes/ProductTypesCreate';
// import Statuses from './pages/Statuses/Statuses';
// import StatusesEdit from './pages/Statuses/StatusesEdit';
// import StatusesCreate from './pages/Statuses/StatusesCreate';

// import OrderStatuses from './pages/OrderStatuses/OrderStatuses';
// import OrderStatusEdit from './pages/OrderStatuses/OrderStatusEdit';
// import OrderStatusCreate from './pages/OrderStatuses/OrderStatusCreate';

import OrderProducts from './pages/OrderProducts/OrderProducts';
import OrderProductEdit from './pages/OrderProducts/OrderProductsEdit';
import OrderProductsCreate from './pages/OrderProducts/OrderProductsCreate';

import NavBar from './components/NavBar';


function App() {
  const [itemToEdit, setItemToEdit] = useState();

  return (
    <div className='page-container'>

      <header className="site-header">
        <div className="header-content">
    
          <img
            src="/logo-noblegoldfish.png"
            alt="NobleGoldfish mascot riding a skateboard"
            className="header-logo"
          />
        


          <div className="site-title">
            <h1>NobleGoldfish</h1>
            <p>Riding above the current</p>
          </div>
        </div>
      </header>


      <div className='app'>
        <div className='layout'>
          <Router>
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/customers" element={<Customers setItemToEdit={setItemToEdit}/>}></Route>
              <Route path="/customers/edit" element={<CustomerEdit customer={itemToEdit} />}></Route>
              <Route path="/customers/create" element={<CustomerCreate />}></Route> 

              <Route path="/products" element={<Products setItemToEdit={setItemToEdit}/>}></Route>
              <Route path="/products/edit" element={<ProductsEdit itemToEdit={itemToEdit}/>}></Route>
              <Route path="/products/create" element={<ProductsCreate />}></Route>

              <Route path="/manufacturers" element={<Manufacturers setItemToEdit={setItemToEdit}/>}></Route>
              <Route path="/manufacturers/edit" element={<ManufacturersEdit itemToEdit={itemToEdit}/>}></Route>
              <Route path="/manufacturers/create" element={<ManufacturersCreate />}></Route>

              {/* <Route path="/statuses" element={<Statuses setItemToEdit={setItemToEdit} />}></Route>
              <Route path="/statuses/edit" element={<StatusesEdit status={itemToEdit} />}></Route>
              <Route path="/statuses/create" element={<StatusesCreate  />}></Route> */}

              {/* <Route path="/producttypes" element={<ProductTypes setItemToEdit={setItemToEdit} />}></Route>
              <Route path="/producttypes/edit" element={<ProductTypesEdit itemToEdit={itemToEdit}/>}></Route>
              <Route path="/producttypes/create" element={<ProductTypesCreate />}></Route> */}

              <Route path="/orders" element={<Orders setItemToEdit={setItemToEdit}/>}></Route>
              <Route path="/orders/edit" element={<OrderEdit order={itemToEdit} setItemToEdit={setItemToEdit}/>}></Route>
              <Route path="/orders/create" element={<OrderCreate />}></Route>

              {/* <Route path="/ordersstatuses" element={<OrderStatuses setItemToEdit={setItemToEdit}/>}></Route>
              <Route path="/ordersstatuses/edit" element={<OrderStatusEdit orderstatus={itemToEdit} />}></Route>
              <Route path="/ordersstatuses/create" element={<OrderStatusCreate />}></Route> */}

              <Route path="/orderproducts" element={<OrderProducts setItemToEdit={setItemToEdit}/>}></Route>
              <Route path="/orderproducts/edit" element={<OrderProductEdit itemToEdit={itemToEdit} />}></Route>
              <Route path="/orderproducts/create" element={<OrderProductsCreate />}></Route>
              <Route path="/reset" element={<ResetDB />}></Route>

            </Routes>
          </Router>
        </div>
      </div>
      <footer>
        <p>&copy; 2026 Group 13 Luckynumber13 Joshua York, Jonathan Marchand</p>
      </footer>
    </div>

  );

} export default App;