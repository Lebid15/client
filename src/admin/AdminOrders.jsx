import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [refresh, setRefresh] = useState(false);

  const token = localStorage.getItem('token');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/products/admin/orders/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data);
      } catch (err) {
        setError('فشل في تحميل الطلبات.');
      }
    };

    fetchOrders();
  }, [refresh]);

  const handleReview = async (orderId, status) => {
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/products/admin/orders/${orderId}/review/`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRefresh(!refresh); // ✅ لإعادة تحميل الطلبات بعد التحديث
    } catch (err) {
      alert('فشل في تحديث الطلب.');
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending':
        return <span className="text-yellow-400 flex items-center gap-1"><Clock size={16} /> انتظار</span>;
      case 'approved':
        return <span className="text-green-400 flex items-center gap-1"><CheckCircle size={16} /> مقبول</span>;
      case 'rejected':
        return <span className="text-red-400 flex items-center gap-1"><XCircle size={16} /> مرفوض</span>;
      default:
        return status;
    }
  };

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">📋 إدارة الطلبات</h1>

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : orders.length === 0 ? (
        <p>لا توجد طلبات بعد.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-gray-800 rounded p-4 shadow">
              <div>📧 المستخدم: {order.user_email}</div>
              <div>🎁 الباقة: {order.package_name}</div>
              <div>💰 السعر: {order.package_price} {order.currency_symbol}</div>
              <div>📅 التاريخ: {new Date(order.created_at).toLocaleString()}</div>
              <div className="mt-2">الحالة: {getStatusLabel(order.status)}</div>

              {order.status === 'pending' && (
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleReview(order.id, 'approved')}
                    className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded text-sm"
                  >
                    ✅ قبول
                  </button>
                  <button
                    onClick={() => handleReview(order.id, 'rejected')}
                    className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-sm"
                  >
                    ❌ رفض
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
