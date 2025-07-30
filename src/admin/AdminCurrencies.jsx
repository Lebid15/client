import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminCurrencies = () => {
  const [currencies, setCurrencies] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const fetchCurrencies = async () => {
    try {
      const res = await axios.get('https://watan-store-app.herokuapp.com/api/accounts/currencies/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCurrencies(res.data);
    } catch (err) {
      console.error('خطأ أثناء تحميل العملات:', err);
    }
  };

  const handleRateChange = (index, newRate) => {
    const updated = [...currencies];
    updated[index].rate_to_usd = newRate;
    setCurrencies(updated);
  };

  const handleSave = async (currency) => {
    try {
      await axios.put(
        `http://https://watan-store-app.herokuapp.com/api/accounts/currencies/${currency.id}/`,
        { rate_to_usd: currency.rate_to_usd },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('✅ تم تحديث سعر العملة بنجاح');
    } catch (err) {
      console.error('خطأ أثناء حفظ التعديلات:', err);
      alert('❌ فشل في تحديث السعر');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold text-white mb-4">إدارة أسعار العملات</h1>
      <table className="w-full bg-gray-800 rounded-lg overflow-hidden">
        <thead className="bg-gray-700 text-white text-sm">
          <tr>
            <th className="p-3 text-right">الاسم</th>
            <th className="p-3 text-right">الرمز</th>
            <th className="p-3 text-right">رمز العملة</th>
            <th className="p-3 text-right">سعر الصرف (لكل 1$)</th>
            <th className="p-3 text-right">حفظ</th>
          </tr>
        </thead>
        <tbody>
          {currencies.map((currency, index) => (
            <tr key={currency.id} className="text-white border-t border-gray-700">
              <td className="p-3">{currency.name}</td>
              <td className="p-3">{currency.code}</td>
              <td className="p-3">{currency.symbol}</td>
              <td className="p-3">
                <input
                type="number"
                value={Number(currency.rate_to_usd).toString()}
                onChange={(e) => handleRateChange(index, e.target.value)}
                className="bg-gray-700 px-2 py-1 rounded w-24 text-white"
                />
              </td>
              <td className="p-3">
                <button
                  onClick={() => handleSave(currency)}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
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

export default AdminCurrencies;
