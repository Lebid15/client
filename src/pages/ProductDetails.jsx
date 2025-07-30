import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../UserContext';

const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [userGroupId, setUserGroupId] = useState(null);
  const [userCurrency, setUserCurrency] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const { setUser } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        // 1. جلب بيانات المستخدم مع العملة ومجموعة الأسعار
        const profileRes = await axios.get("https://watan-store-app.herokuapp.com/api/accounts/profile-by-token/", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserGroupId(profileRes.data.price_group_id || null);
        setUserCurrency(profileRes.data.currency || null);

        // 2. جلب المنتج
        const res = await axios.get(`https://watan-store-app.herokuapp.com/api/products/${slug}/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProduct(res.data);
      } catch (err) {
        console.error('حدث خطأ أثناء جلب البيانات:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  const getConvertedPrice = (pkg) => {
    const rate = userCurrency?.rate_to_usd || 1;
    const symbol = userCurrency?.symbol || "$";
    const groupPriceObj = pkg.price_groups.find(g => g.group_id === userGroupId);
    const price = groupPriceObj?.price || pkg.base_price;
    const finalPrice = (parseFloat(price) * parseFloat(rate)).toFixed(2);
    return `${finalPrice} ${symbol}`;
  };

  const handleOrder = async () => {
    if (!selectedPackage) return alert('يرجى اختيار باقة أولاً.');
    const token = localStorage.getItem('token');

    try {
      await axios.post(
        'https://watan-store-app.herokuapp.com/api/products/orders/create/',
        { package_id: selectedPackage.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const profileRes = await axios.get("https://watan-store-app.herokuapp.com/api/accounts/profile/", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(profileRes.data);
      navigate('/orders');
    } catch (error) {
      setMessage('❌ فشل في إرسال الطلب.');
      console.error(error);
    }
  };

  if (loading) return <div className="text-white p-4">جاري التحميل...</div>;
  if (!product) return <div className="text-red-500 p-4">المنتج غير موجود</div>;

  return (
    <div className="p-4">
      <img
        src={product.image}
        alt={product.title}
        className="max-h-32 w-auto mx-auto object-contain rounded-lg"
      />
      <h1 className="text-2xl font-bold mb-2 text-white text-center">{product.title}</h1>
      <p className="text-gray-300 mb-4 text-center">{product.description || 'وصف غير متوفر'}</p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {product.packages.map((pkg) => (
          <button
            key={pkg.id}
            onClick={() => setSelectedPackage(pkg)}
            className={`p-2 rounded border text-center ${
              selectedPackage?.id === pkg.id ? 'bg-green-600 text-white' : 'bg-gray-800 text-white'
            }`}
          >
            <div className="font-semibold">{pkg.name}</div>
            <div className="text-sm mt-1 text-gray-300">
              {getConvertedPrice(pkg)}
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={handleOrder}
        className="w-full bg-green-600 text-white p-3 rounded font-bold"
      >
        شراء الآن
      </button>

      {message && <div className="mt-4 text-yellow-400 font-semibold text-center">{message}</div>}
    </div>
  );
};

export default ProductDetails;
