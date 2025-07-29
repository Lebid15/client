import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPriceGroups = () => {
  const [groups, setGroups] = useState([]);
  const [newGroup, setNewGroup] = useState({ name: '', description: '' });

  const apiToken = localStorage.getItem('api_token');

  const fetchGroups = () => {
    axios.get('http://localhost:8000/api/accounts/price-groups/', {
      headers: {
        'X-API-TOKEN': apiToken,
      },
    })
    .then((res) => {
      setGroups(res.data);
    })
    .catch((err) => {
      console.error('خطأ أثناء جلب المجموعات:', err);
    });
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleAddGroup = () => {
  console.log('التوكن المستخدم:', apiToken);

    axios.post(
      'http://localhost:8000/api/accounts/price-groups/',
      JSON.stringify(newGroup),
      {
        headers: {
          'X-API-TOKEN': apiToken,
          'Content-Type': 'application/json',
        },
      }
    )
    .then(() => {
      setNewGroup({ name: '', description: '' });
      fetchGroups();
    })
    .catch((err) => {
      console.error('فشل في إضافة المجموعة:', err.response?.data || err.message);
      alert('حدث خطأ أثناء الإضافة');
    });
  };


  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">إدارة مجموعات الأسعار</h2>

      {/* ✅ جدول عرض المجموعات */}
      <table className="w-full border mb-8">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">الاسم</th>
            <th className="border p-2">الوصف</th>
            <th className="border p-2">إجراء</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => (
            <tr key={group.id}>
              <td className="border p-2">{group.name}</td>
              <td className="border p-2">{group.description}</td>
              <td className="border p-2 text-center">—</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ نموذج إضافة مجموعة جديدة */}
      <div className="mt-8 border-t pt-4">
        <h3 className="text-lg font-semibold mb-2">إضافة مجموعة جديدة:</h3>
        <div className="flex flex-col md:flex-row gap-2 mb-3">
          <input
            type="text"
            placeholder="اسم المجموعة"
            value={newGroup.name}
            onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
            className="border px-3 py-2 w-full md:w-1/3"
          />
          <input
            type="text"
            placeholder="الوصف"
            value={newGroup.description}
            onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
            className="border px-3 py-2 w-full md:w-2/3"
          />
        </div>
        <button
          onClick={handleAddGroup}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          إضافة
        </button>
      </div>
    </div>
  );
};

export default AdminPriceGroups;
