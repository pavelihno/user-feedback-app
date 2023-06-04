import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import UpdateUserForm from './components/user/UpdateUserForm';
import ProductTypeList from './components/productType/ProductTypeList';
import ProductList from './components/product/ProductList';
import CreateProductForm from './components/product/CreateProductForm';
import UpdateProductForm from './components/product/UpdateProductForm';
import ReviewList from './components/review/ReviewList';
import CreateProductTypeForm from './components/productType/CreateProductTypeForm';
import UpdateProductTypeForm from './components/productType/UpdateProductTypeForm';
import CreateReviewForm from './components/review/CreateReviewForm';
import UpdateReviewForm from './components/review/UpdateReviewForm';
import ProductReviewList from './components/review/ProductReviewList';
import UserReviewList from './components/review/UserReviewList';
import { auth } from './redux/actions/auth';


function App() {
  const dispatch = useDispatch();

  useEffect(() => { dispatch(auth()) }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/users" element={<UpdateUserForm />} />

      <Route path="/productTypes" element={<ProductTypeList />} />
      <Route path="/productTypes/new" element={<CreateProductTypeForm />} />
      <Route path="/productTypes/:id" element={<UpdateProductTypeForm />} />

      <Route path="/products/:id/list" element={<ProductList />} />
      <Route path="/products/:id/new" element={<CreateProductForm />} />
      <Route path="/products/:id" element={<UpdateProductForm />} />

      <Route path="/reviews/:id/list" element={<ProductReviewList />} />
      <Route path="/reviews" element={<UserReviewList />} />
      <Route path="/reviews/:id/new" element={<CreateReviewForm />} />
      <Route path="/reviews/:id" element={<UpdateReviewForm />} />

    </Routes>
  );
}

export default App;
