import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AdminProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [newPackage, setNewPackage] = useState({ name: '', price: '' });
  const [editingPackage, setEditingPackage] = useState(null);

  const token = localStorage.getItem('token');

  const fetchProduct = () => {
      axios.get(`http://localhost:8000/api/products/admin/products/${id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setProduct(res.data))
      .catch((err) => {
        console.error('❌ فشل في جلب تفاصيل المنتج:', err.response?.data || err.message);
      });
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddPackage = () => {
    if (!newPackage.name || !newPackage.price) return;
      axios.post(`http://localhost:8000/api/products/admin/products/${id}/add-package/`, newPackage, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        setNewPackage({ name: '', price: '' });
        fetchProduct();
      })
      .catch((err) => console.error('فشل في إضافة الباقة:', err.response?.data || err.message));
  };

  const handleDeletePackage = (packageId) => {
    axios.delete(`http://localhost:8000/api/packages/${packageId}/delete/`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => fetchProduct())
      .catch((err) => console.error('فشل في حذف الباقة:', err.response?.data || err.message));
  };

  const handleEditPackage = (pkg) => {
    setEditingPackage(pkg);
  };

  const handleUpdatePackage = () => {
    axios.put(`http://localhost:8000/api/packages/${editingPackage.id}/update/`, editingPackage, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        setEditingPackage(null);
        fetchProduct();
      })
      .catch((err) => console.error('فشل في تعديل الباقة:', err.response?.data || err.message));
  };

  if (!product) return <div className="p-4">...جاري تحميل المنتج</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">تفاصيل المنتج: {product.title}</h2>
      <img src={product.image} alt={product.title} className="w-32 h-32 rounded mb-4" />
      <p className="mb-2">الحالة: {product.is_active ? '✅ مفعل' : '❌ معطل'}</p>

      <h3 className="font-bold mt-6 mb-2">الباقات:</h3>
      {product.packages && product.packages.length > 0 ? (
        <table className="w-full text-center border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">الاسم</th>
              <th className="border p-2">السعر</th>
              <th className="border p-2">إجراء</th>
            </tr>
          </thead>
          <tbody>
            {product.packages.map((pkg) => (
              <tr key={pkg.id} className="border-t">
                <td className="p-2">{pkg.name}</td>
                <td className="p-2">{pkg.base_price} ل.س</td>
                <td className="p-2 flex justify-center gap-2">
                  <button
                    onClick={() => handleEditPackage(pkg)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => handleDeletePackage(pkg.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">لا توجد باقات بعد.</p>
      )}

      {/* نموذج إضافة باقة جديدة */}
      <div className="mt-6 border-t pt-4">
        <h4 className="font-bold mb-2">إضافة باقة جديدة:</h4>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="اسم الباقة"
            value={newPackage.name}
            onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
            className="border px-2 py-1 w-1/2"
          />
          <input
            type="number"
            placeholder="السعر"
            value={newPackage.price}
            onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
            className="border px-2 py-1 w-1/2"
          />
        </div>
        <button
          onClick={handleAddPackage}
          className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
        >
          إضافة
        </button>
      </div>

      {/* تعديل الباقة */}
      {editingPackage && (
        <div className="mt-6 border-t pt-4">
          <h4 className="font-bold mb-2 text-blue-700">تعديل الباقة:</h4>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="اسم الباقة"
              value={editingPackage.name}
              onChange={(e) => setEditingPackage({ ...editingPackage, name: e.target.value })}
              className="border px-2 py-1 w-1/2"
            />
            <input
              type="number"
              placeholder="السعر"
              value={editingPackage.price}
              onChange={(e) => setEditingPackage({ ...editingPackage, price: e.target.value })}
              className="border px-2 py-1 w-1/2"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleUpdatePackage}
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
            >
              حفظ التعديلات
            </button>
            <button
              onClick={() => setEditingPackage(null)}
              className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600"
            >
              إلغاء
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductDetail;
