// src/pages/Notifications.jsx
import React from 'react';

const notifications = [
  { id: 1, message: '⛔ خدمة PUBG متوقفة مؤقتًا.', date: '2025-07-25' },
  { id: 2, message: '🎉 تم إضافة فئة جديدة: IPTV!', date: '2025-07-23' },
  { id: 3, message: '🛠️ صيانة مجدولة يوم الأحد الساعة 10 صباحًا.', date: '2025-07-20' },
];

const Notifications = () => {
  return (
    <div className="p-4 mt-4">
      <h2 className="text-xl font-bold text-white mb-4">التنبيهات</h2>
      <ul className="space-y-3">
        {notifications.map((notif) => (
          <li
            key={notif.id}
            className="bg-gray-800 text-white p-3 rounded shadow-sm border border-gray-700"
          >
            <div>{notif.message}</div>
            <div className="text-xs text-gray-400 mt-1 text-left">{notif.date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
