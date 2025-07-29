import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-yellow-900 text-white p-4 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="font-bold text-xl">Watan Store</h1>
        <ul className="flex gap-4">
          <li>
            <Link to="/" className="hover:underline">الرئيسية</Link>
          </li>
          <li>
            <Link to="/login" className="hover:underline">تسجيل الدخول</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
