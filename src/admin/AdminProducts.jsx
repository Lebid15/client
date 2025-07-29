import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // ✅ مهم جدًا

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();  // ✅ يجب أن يكون داخل الـ component

  useEffect(() => {
    axios.get('http://localhost:8000/api/products/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    }).then(res => {
      setProducts(res.data);
    }).catch(err => {
      console.error('حدث خطأ أثناء جلب المنتجات:', err);
    });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">إدارة المنتجات</h2>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate('/admin/products/create')}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + إضافة منتج جديد
        </button>
      </div>

      <table className="w-full border text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">الصورة</th>
            <th className="border p-2">الاسم</th>
            <th className="border p-2">عدد الباقات</th>
            <th className="border p-2">تاريخ الإضافة</th>
            <th className="border p-2">إجراء</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id} className="border-t">
              <td className="p-2">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-14 h-14 object-cover mx-auto rounded"
                />
              </td>
              <td className="p-2">{product.title}</td>
              <td className="p-2">{product.packages_count}</td>
              <td className="p-2">{product.created_at}</td>
              <td className="p-2">
                <button
                  onClick={() => navigate(`/admin/products/${product.id}`)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  تعديل
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;
