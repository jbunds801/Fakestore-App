//import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import HomePage from './components/HomePage.jsx';
import ProductListing from './components/ProductListing.jsx';
import ProductDetails from './components/ProductDetails.jsx';
import AddProduct from './components/AddProduct.jsx';
/* import DeleteProduct from './components/DeleteProduct.jsx'; */
import './App.css'

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/products' element={<ProductListing />} />
        <Route path='/products/:id' element={<ProductDetails />} />
        <Route path='/addproduct' element={<AddProduct />} />
        {/* <Route path='/deleteproduct' element={<DeleteProduct />} /> */}
        {/* <Route path='/editproduct' element={<EditProduct />} /> */}
      </Routes>
    </>
  );
}

export default App;
