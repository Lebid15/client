import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const AdminLayout = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // دالة تتحقق إن كان الرابط الحالي نشطًا
  const isActive = (path) => location.pathname === path;

  // لتبديل حالة القائمة
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-900 text-white px-6 py-4 shadow-md flex flex-col md:flex-row md:items-center">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold mb-2">لوحة تحكم المشرف</div>

          {/* زر القائمة للهواتف */}
          <button 
            className="md:hidden text-yellow-400 text-2xl focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            &#9776;
          </button>
        </div>

        {/* القائمة - تظهر بشكل عمودي في الشاشات الصغيرة */}
        <nav 
          className={`flex flex-col gap-2 md:flex-row md:gap-6 text-sm ${menuOpen ? 'block' : 'hidden'} md:flex`}
        >

          <Link
            to="/admin"
            className={`hover:text-yellow-300 ${isActive('/admin') ? 'text-yellow-400 font-bold' : ''}`}
            onClick={() => setMenuOpen(false)} // غلق القائمة عند اختيار رابط
          >
            الرئيسية
          </Link>
          <Link
            to="/admin/orders"
            className={`hover:text-yellow-300 ${isActive('/admin/orders') ? 'text-yellow-400 font-bold' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            الطلبات
          </Link>
          <Link
            to="/admin/users"
            className={`hover:text-yellow-300 ${isActive('/admin/users') ? 'text-yellow-400 font-bold' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            المستخدمين
          </Link>
          <Link
            to="/admin/products"
            className={`hover:text-yellow-300 ${isActive('/admin/products') ? 'text-yellow-400 font-bold' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            المنتجات
          </Link>
          <Link
            to="/admin/price-groups"
            className={`hover:text-yellow-300 ${isActive('/admin/price-groups') ? 'text-yellow-400 font-bold' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            مجموعات الأسعار
          </Link>
          <Link
            to="/admin/price-groups/manage"
            className={`hover:text-yellow-300 ${isActive('/admin/price-groups/manage') ? 'text-yellow-400 font-bold' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            إدارة المجموعات
          </Link>
          <Link
            to="/admin/users-price-groups"
            className={`hover:text-yellow-300 ${isActive('/admin/users-price-groups') ? 'text-yellow-400 font-bold' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            ربط المستخدمين بالأسعار
          </Link>
          <Link
            to="/admin/currencies"
            className={`hover:text-yellow-300 ${isActive('/admin/currencies') ? 'text-yellow-400 font-bold' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            إدارة العملات
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

