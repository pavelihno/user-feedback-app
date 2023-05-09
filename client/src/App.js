import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import store from './redux/store';
import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import UserList from './components/user/UserList';
import UpdateUserForm from './components/user/UpdateUserForm';
import ChangePasswordForm from './components/user/ChangePasswordForm';
import ProductTypeList from './components/productType/ProductTypeList';
import ProductTypeForm from './components/productType/ProductTypeForm';
import ProductList from './components/product/ProductList';
import ProductDetail from './components/product/ProductDetail';
import ProductForm from './components/product/ProductForm';
import ReviewList from './components/review/ReviewList';
import ReviewDetail from './components/review/ReviewDetail';
import ReviewForm from './components/review/ReviewForm';
import AttachmentUploader from './components/review/AttachmentUploader';
import CommentList from './components/comment/CommentList';
import CommentDetail from './components/comment/CommentDetail';
import CommentForm from './components/comment/CommentForm';
import { selectIsAuth } from './redux/reducers/auth';
import { auth } from './redux/actions/auth';
import CreateProductTypeForm from './components/productType/CreateProductTypeForm';
import UpdateProductTypeForm from './components/productType/UpdateProductTypeForm';


function App() {
  const dispatch = useDispatch();

  useEffect(() => { dispatch(auth()) }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/users/:id" element={<UpdateUserForm />} />
      {/* <Route path="/users" element={<UserList />} />
      <Route path="/users/new" element={<UserForm />} />
      <Route path="/users/:id/resetPassword" element={<ChangePasswordForm />} /> */}

      <Route path="/productTypes" element={<ProductTypeList />} />
      <Route path="/productTypes/:id" element={<UpdateProductTypeForm />} />
      <Route path="/productTypes/new" element={<CreateProductTypeForm />} />

      {/* <Route path="/products" element={<ProductList />} />
      <Route path="/products/new" element={<ProductForm />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/products/:id/edit" element={<ProductForm />} />

      <Route path="/reviews" element={<ReviewList />} />
      <Route path="/reviews/new" element={<ReviewForm />} />
      <Route path="/reviews/:id" element={<ReviewDetail />} />
      <Route path="/reviews/:id/edit" element={<ReviewForm />} />
      <Route path="/reviews/:id/attachments" element={<AttachmentUploader />} />

      <Route path="/comments" element={<CommentList />} />
      <Route path="/comments/new" element={<CommentForm />} />
      <Route path="/comments/:id" element={<CommentDetail />} />
      <Route path="/comments/:id/edit" element={<CommentForm />} /> */}
    </Routes>
  );
}

export default App;
