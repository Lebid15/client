import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingCart, Wallet, Bell, User } from 'lucide-react';

const BottomNav = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed bottom-0 w-full bg-black text-white border-t border-gray-700 flex justify-around py-2 z-50">
      <Link to="/" className={`flex flex-col items-center ${isActive('/') ? 'text-green-400' : ''}`}>
        <Home size={24} />
        <span className="text-xs">الرئيسية</span>
      </Link>
      <Link to="/orders" className={`flex flex-col items-center ${isActive('/orders') ? 'text-green-400' : ''}`}>
        <ShoppingCart size={24} />
        <span className="text-xs">طلباتي</span>
      </Link>
      <Link to="/wallet" className={`flex flex-col items-center ${isActive('/wallet') ? 'text-green-400' : ''}`}>
        <Wallet size={24} />
        <span className="text-xs">محفظتي</span>
      </Link>
      <Link to="/notifications" className={`flex flex-col items-center ${isActive('/notifications') ? 'text-green-400' : ''}`}>
        <Bell size={24} />
        <span className="text-xs">تنبيهات</span>
      </Link>
      <Link to="/about" className={`flex flex-col items-center ${isActive('/about') ? 'text-green-400' : ''}`}>
        <User size={24} />
        <span className="text-xs">من نحن</span>
      </Link>
    </div>
  );
};

export default BottomNav;
