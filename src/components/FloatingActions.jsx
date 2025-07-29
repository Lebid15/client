import React, { useState } from 'react';
import { Plus, X, Home, ShoppingCart, Wallet, Shield, Info, Bot, UserPlus, LifeBuoy, LayoutDashboard } from 'lucide-react';

const FloatingActions = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);

  const menuItems = [
    { icon: <Home size={20} />, label: 'الرئيسية' },
    { icon: <Wallet size={20} />, label: 'محفظتي' },
    { icon: <ShoppingCart size={20} />, label: 'طلباتي' },
    { icon: <UserPlus size={20} />, label: 'وكلاؤنا' },
    { icon: <LifeBuoy size={20} />, label: 'دعم فني' },
    { icon: <LayoutDashboard size={20} />, label: 'إضافة رصيد' },
    { icon: <Bot size={20} />, label: 'API' },
    { icon: <Shield size={20} />, label: 'الحماية' },
    { icon: <Info size={20} />, label: 'من نحن' },
  ];

  return (
    <div className="fixed bottom-20 right-4 z-50">
      {open && (
        <div className="bg-gray-900 text-white rounded-xl shadow-lg p-4 w-72 grid grid-cols-3 gap-3 mb-3">
          {menuItems.map((item, index) => (
            <button key={index} className="flex flex-col items-center text-sm hover:text-green-400">
              {item.icon}
              <span className="mt-1">{item.label}</span>
            </button>
          ))}
        </div>
      )}
      <button
        onClick={toggleMenu}
        className={`w-14 h-14 rounded-full flex items-center justify-center text-white transition-all duration-300 ${
          open ? 'bg-red-600' : 'bg-green-500'
        }`}
      >
        {open ? <X size={28} /> : <Plus size={28} />}
      </button>
    </div>
  );
};

export default FloatingActions;
