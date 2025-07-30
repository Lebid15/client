import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('https://watan-store-app-2742b6ac556c.herokuapp.com/api/accounts/admin/users/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch {
        setError('فشل في تحميل المستخدمين.');
      }
    };
    fetchUsers();
  }, [refresh]);

  const handleBalanceUpdate = async (userId, newBalance) => {
    try {
      await axios.post(
        `https://watan-store-app-2742b6ac556c.herokuapp.com/api/accounts/admin/users/${userId}/balance/`,
        { balance: newBalance },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRefresh(!refresh);
    } catch {
      alert('فشل في تحديث الرصيد.');
    }
  };

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">👥 إدارة المستخدمين</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="bg-gray-800 rounded p-4 shadow space-y-2">
              <div>📧 البريد الإلكتروني: {user.email}</div>
              <div>💰 الرصيد الحالي: {user.balance} ₺</div>
              <div>📅 الانضمام: {new Date(user.date_joined).toLocaleString()}</div>
              <div className="flex gap-2 mt-2">
                <input
                  type="number"
                  step="0.01"
                  placeholder="رصيد جديد"
                  className="p-1 rounded text-black"
                  onChange={(e) => user.newBalance = e.target.value}
                />
                <button
                  onClick={() => handleBalanceUpdate(user.id, user.newBalance)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                >
                  💾 تحديث الرصيد
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
