import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsersPriceGroups = () => {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const api_token = localStorage.getItem("api_token");
    const headers = { 'X-API-TOKEN': api_token };

    try {
      const [usersRes, groupsRes] = await Promise.all([
        axios.get('/api/accounts/admin/users/', { headers }),
        axios.get('/api/accounts/price-groups/', { headers }),
      ]);

      const fetchedUsers = usersRes.data;
      const fetchedGroups = groupsRes.data;

      setUsers(fetchedUsers);
      setGroups(fetchedGroups);

      const updatedSelection = {};
      fetchedUsers.forEach(user => {
        updatedSelection[user.id] = user.price_group_id || '';
      });
      setSelectedGroups(updatedSelection);
    } catch (err) {
      console.error('❌ فشل في جلب البيانات:', err);
    }
  };

  const handleSelectChange = (userId, groupId) => {
    setSelectedGroups(prev => ({
      ...prev,
      [userId]: groupId
    }));
  };

  const getGroupNameById = (id) => {
    const group = groups.find(g => g.id == id);
    return group ? group.name : '';
  };

  const getUserEmailById = (id) => {
    const user = users.find(u => u.id == id);
    return user ? user.email : '';
  };

  const handleSaveGroup = async (userId) => {
    const api_token = localStorage.getItem("api_token");
    const headers = { 'X-API-TOKEN': api_token };
    const groupId = selectedGroups[userId];

    try {
      await axios.post('/api/accounts/admin/set-user-group/', {
        user_id: userId,
        group_id: groupId
      }, { headers });

      alert(`✅ تم ربط ${getUserEmailById(userId)} بالمجموعة ${getGroupNameById(groupId)}`);

      // ✅ تحديث محلي سريع
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userId
            ? {
                ...user,
                price_group_id: groupId,
                price_group_name: getGroupNameById(groupId)
              }
            : user
        )
      );

      // ✅ جلب مجدد من الباك إند للتأكد من التزامن الكامل
      await fetchData();

    } catch (err) {
      console.error('❌ فشل في التحديث:', err);
      alert('❌ فشل في حفظ التغييرات');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">ربط المستخدمين بمجموعات الأسعار</h2>
      <table className="w-full border text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">المستخدم</th>
            <th className="p-2 border">المجموعة الحالية</th>
            <th className="p-2 border">تغيير إلى</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">
                {user.price_group_name && user.price_group_name.trim() !== ''
                  ? user.price_group_name
                  : '—'}
              </td>
              <td className="p-2 border flex items-center gap-2">
                <select
                  className="border px-2 py-1"
                  value={selectedGroups[user.id] || ''}
                  onChange={(e) => handleSelectChange(user.id, e.target.value)}
                >
                  <option value="">— اختر مجموعة —</option>
                  {groups.map(group => (
                    <option key={group.id} value={group.id}>{group.name}</option>
                  ))}
                </select>
                <button
                  onClick={() => handleSaveGroup(user.id)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  حفظ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPriceGroups;
