// src/pages/Wallet.jsx
import React from 'react';

const Wallet = () => {
  return (
    <div className="p-4 text-white">
      <h2 className="text-2xl font-bold mb-4">محفظتي</h2>

      {/* ✅ الرصيد الحالي */}
      <div className="bg-gray-800 p-4 rounded mb-4">
        <p className="text-gray-400">الرصيد الحالي</p>
        <h3 className="text-3xl font-bold text-green-400">₺ 250.00</h3>
      </div>

      {/* ✅ أزرار الشحن والسحب */}
      <div className="flex gap-4 mb-6">
        <button className="flex-1 bg-green-600 hover:bg-green-700 p-2 rounded">شحن الرصيد</button>
        <button className="flex-1 bg-yellow-600 hover:bg-yellow-700 p-2 rounded">سحب الرصيد</button>
      </div>

      {/* ✅ سجل المعاملات */}
      <div>
        <h4 className="font-bold mb-2">سجل المعاملات</h4>
        <ul className="space-y-2 text-sm">
          <li className="bg-gray-800 p-2 rounded flex justify-between">
            <span>شحن 100₺</span>
            <span className="text-gray-400">2025-07-20</span>
          </li>
          <li className="bg-gray-800 p-2 rounded flex justify-between">
            <span>شراء 50₺</span>
            <span className="text-gray-400">2025-07-18</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Wallet;
