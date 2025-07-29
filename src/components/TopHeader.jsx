import React, { useState, useEffect, useRef } from 'react';
import { User, Settings, Star, LogOut, Shield, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext'; // ✅ استيراد الـ context

const TopHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useUser(); // ✅ استخدام البيانات من السياق
  const navigate = useNavigate();
  const menuRef = useRef(null); // لإشارة على النافذة

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
    navigate('/login');
  };

  // إغلاق النافذة عند الضغط خارجها
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  if (!user) return null;

  return (
    <div className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between shadow-sm relative">
      <div className="relative">
        <Settings
          size={20}
          className="cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        />

        {menuOpen && (
          <div
            ref={menuRef}
            className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg p-4 z-50"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-yellow-400 text-black rounded-full w-10 h-10 flex items-center justify-center font-bold">
                TL
              </div>
              <div>
                <p className="text-sm font-bold">{user.name}</p>
                <p className="text-xs text-gray-300">#{user.id}</p>
              </div>
            </div>

            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 hover:text-green-400"
                >
                  <User size={16} /> الملف الشخصي
                </Link>
              </li>
              <li className="flex items-center gap-2 text-gray-300 hover:text-green-400 cursor-pointer">
                <Heart size={16} /> المفضلة
              </li>
              <li className="flex items-center gap-2 text-gray-300 hover:text-green-400 cursor-pointer">
                <Shield size={16} /> الحماية
              </li>
              <li
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-300 hover:text-red-400 cursor-pointer"
              >
                <LogOut size={16} /> تسجيل الخروج
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center text-xs">
        <span className="font-bold text-sm">{user.name}</span>
        <span className="text-yellow-400 flex items-center gap-1">
          <Star size={14} /> VIP
        </span>
      </div>
      
      <div className="text-sm font-semibold bg-green-600 text-white px-3 py-1 rounded-full">
        {user.currency ? `${user.currency.symbol} ${user.balance}` : `$ ${user.balance}`}
      </div>
    </div>
  );
};

export default TopHeader;
