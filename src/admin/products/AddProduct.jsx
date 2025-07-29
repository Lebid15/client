import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [isActive, setIsActive] = useState(true);
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  const handleAddPackage = () => {
    setPackages([...packages, { name: '', description: '', price: '' }]);
  };

  const handleRemovePackage = (index) => {
    const newPackages = [...packages];
    newPackages.splice(index, 1);
    setPackages(newPackages);
  };

  const handlePackageChange = (index, field, value) => {
    const newPackages = [...packages];
    newPackages[index][field] = value;
    setPackages(newPackages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('is_active', isActive);
    if (image) {
      formData.append('image', image);
    }

    const hasValidPackages = packages.some(pkg => pkg.name || pkg.price);
    if (hasValidPackages) {
      const packagesJson = JSON.stringify(packages);
      const packagesBlob = new Blob([packagesJson], { type: 'application/json' });
      formData.append('packages', packagesBlob);
    }

    try {
      await axios.post('http://localhost:8000/api/products/create/', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('✅ تم حفظ المنتج بنجاح');
      navigate('/admin/products');
    } catch (error) {
      console.error('❌ خطأ أثناء الإرسال:', error.response?.data || error.message);
      alert('حدث خطأ أثناء حفظ المنتج');
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">إضافة منتج جديد</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-medium">اسم المنتج</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">صورة المنتج</label>
          <input
            type="file"
            onChange={e => setImage(e.target.files[0])}
            className="w-full"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">حالة المنتج</label>
          <select
            value={isActive ? '1' : '0'}
            onChange={(e) => setIsActive(e.target.value === '1')}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="1">مفعل</option>
            <option value="0">معطل</option>
          </select>
        </div>

        <div>
          <h3 className="font-bold mb-2">الباقات (اختياري)</h3>
          {packages.map((pkg, index) => (
            <div key={index} className="border p-3 rounded mb-2 space-y-2 relative">
              <button
                type="button"
                onClick={() => handleRemovePackage(index)}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                title="حذف الباقة"
              >
                ✕
              </button>
              <input
                type="text"
                placeholder="اسم الباقة"
                value={pkg.name}
                onChange={e => handlePackageChange(index, 'name', e.target.value)}
                className="w-full border px-2 py-1 rounded"
              />
              <input
                type="text"
                placeholder="الوصف"
                value={pkg.description}
                onChange={e => handlePackageChange(index, 'description', e.target.value)}
                className="w-full border px-2 py-1 rounded"
              />
              <input
                type="number"
                placeholder="السعر"
                value={pkg.price}
                onChange={e => handlePackageChange(index, 'price', e.target.value)}
                className="w-full border px-2 py-1 rounded"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddPackage}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            + إضافة باقة
          </button>
        </div>

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          حفظ المنتج
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
