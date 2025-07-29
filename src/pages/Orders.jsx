import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useUser } from '../UserContext';  // استيراد الـ context

const Orders = () => {
  const { user } = useUser();  // جلب بيانات المستخدم
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('لم يتم تسجيل الدخول.');
        return;
      }

      try {
        const res = await axios.get('http://127.0.0.1:8000/api/products/my-orders/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data);
      } catch (err) {
        setError('فشل في تحميل الطلبات.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusDetails = (status) => {
    switch (status) {
      case 'pending':
        return {
          label: 'انتظار',
          bg: 'bg-yellow-500',
          icon: <Loader2 size={18} className="animate-spin inline-block ml-1" />
        };
      case 'approved':
        return {
          label: 'مقبول',
          bg: 'bg-green-600',
          icon: <CheckCircle size={18} className="inline-block ml-1" />
        };
      case 'rejected':
        return {
          label: 'مرفوض',
          bg: 'bg-orange-600',
          icon: <XCircle size={18} className="inline-block ml-1" />
        };
      default:
        return {
          label: status,
          bg: 'bg-gray-600',
          icon: null
        };
    }
  };

  if (loading) return <div className="p-4 text-white">جارٍ تحميل الطلبات...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4 text-white">
      <h2 className="text-xl font-bold mb-4">طلباتي</h2>
      {orders.length === 0 ? (
        <p>لا يوجد لديك طلبات.</p>
      ) : (
        <ul className="space-y-3">
          {orders.map(order => {
            const { label, bg, icon } = getStatusDetails(order.status);
            return (
              <li key={order.id} className={`${bg} p-3 rounded`}>
                <p>الباقة: {order.package_name}</p>
                <div>💰 السعر: {order.package_price} {order.currency_symbol}</div>
                <p>الحالة: <span className="font-bold">{icon} {label}</span></p>
                <p className="text-sm text-gray-100">تم الإنشاء: {new Date(order.created_at).toLocaleString()}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Orders;
