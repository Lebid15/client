// src/App.js
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import BottomNav from './components/BottomNav';
import FloatingActions from './components/FloatingActions';
import AnnouncementBar from './components/AnnouncementBar';
import TopHeader from './components/TopHeader';
import ProductDetails from './pages/ProductDetails';
import Orders from './pages/Orders';
import Wallet from './pages/Wallet';
import Notifications from './pages/Notifications';
import About from './pages/About';
import Register from './pages/Register';
import Profile from './pages/Profile';

import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminOrders from './admin/AdminOrders';
import AdminUsers from './admin/AdminUsers';
import AdminProducts from './admin/AdminProducts';
import AddProduct from './admin/products/AddProduct';
import AdminProductDetail from './admin/products/AdminProductDetail';
import AdminHome from './admin/AdminHome';
import PriceGroups from './admin/PriceGroups';
import AdminPriceGroups from './admin/AdminPriceGroups';
import UsersPriceGroups from './admin/UsersPriceGroups';
import AdminCurrencies from './admin/AdminCurrencies'; 

import AdminRoute from './admin/AdminRoute'; // استيراد مكون الحماية

function App() {
  return (
    <>
      <AnnouncementBar />
      <TopHeader />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />

        {/* لف جميع مسارات الإدارة بمكون الحماية */}
        <Route path="/admin" element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }>
          <Route index element={<AdminHome />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/create" element={<AddProduct />} />
          <Route path="products/:id" element={<AdminProductDetail />} />
          <Route path="price-groups" element={<PriceGroups />} />
          <Route path="price-groups/manage" element={<AdminPriceGroups />} />
          <Route path="users-price-groups" element={<UsersPriceGroups />} />
          <Route path="currencies" element={<AdminCurrencies />} />
        </Route>
      </Routes>

      <BottomNav />
      <FloatingActions />
    </>
  );
}

export default App;
