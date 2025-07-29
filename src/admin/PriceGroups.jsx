import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PriceGroups = () => {
  const [packages, setPackages] = useState({});
  const [groups, setGroups] = useState([]);
  const [prices, setPrices] = useState({}); // { packageId_groupId: value }
  const [basePrices, setBasePrices] = useState({}); // { packageId: value }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const api_token = localStorage.getItem('api_token');
      const headers = { 'X-API-TOKEN': api_token };

      const [pkgRes, grpRes] = await Promise.all([
        axios.get('/api/accounts/all-packages/', { headers }),
        axios.get('/api/accounts/price-groups/', { headers }),
      ]);

      setGroups(grpRes.data);

      const priceMap = {};
      const baseMap = {};
      pkgRes.data.forEach((pkg) => {
        baseMap[pkg.id] = pkg.base_price;
        pkg.price_groups.forEach((pg) => {
          const key = `${pkg.id}_${pg.group_id}`;
          priceMap[key] = pg.price;
        });
      });

      setPrices(priceMap);
      setBasePrices(baseMap);

      // ترتيب الباقات حسب المنتج
      const grouped = {};
      pkgRes.data.forEach((pkg) => {
        if (!grouped[pkg.product_title]) {
          grouped[pkg.product_title] = [];
        }
        grouped[pkg.product_title].push(pkg);
      });

      setPackages(grouped);
      setLoading(false);
    } catch (err) {
      console.error('فشل تحميل البيانات:', err);
      setLoading(false);
    }
  };

  const handleChange = (pkgId, groupId, value) => {
    const key = `${pkgId}_${groupId}`;
    setPrices((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleBasePriceChange = (pkgId, value) => {
    setBasePrices((prev) => ({
      ...prev,
      [pkgId]: value,
    }));
  };

  const handleSave = async (pkgId, groupId) => {
    const key = `${pkgId}_${groupId}`;
    const value = prices[key];
    const api_token = localStorage.getItem('api_token');

    try {
      await axios.post(
        '/api/products/admin/update-price/',
        {
          package_id: pkgId,
          group_id: groupId,
          price: value,
        },
        {
          headers: {
            'X-API-TOKEN': api_token,
          },
        }
      );

      alert('✅ تم حفظ السعر');
    } catch (err) {
      console.error(err);
      alert('❌ فشل في حفظ السعر');
    }
  };

  const handleSaveBasePrice = async (pkgId) => {
    const api_token = localStorage.getItem('api_token');

    try {
      await axios.put(
        `/api/products/admin/packages/${pkgId}/update/`,
        { base_price: basePrices[pkgId] },
        {
          headers: {
            'X-API-TOKEN': api_token,
          },
        }
      );

      alert('✅ تم تحديث رأس المال');
    } catch (err) {
      console.error(err);
      alert('❌ فشل في تحديث رأس المال');
    }
  };

  if (loading) {
    return <p className="text-center p-4">⏳ جاري تحميل البيانات...</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">إدارة مجموعات الأسعار</h2>

      {Object.entries(packages).map(([productTitle, productPackages]) => (
        <div key={productTitle} className="mb-10 border rounded bg-gray-50 shadow">
          <h3 className="text-lg font-semibold bg-yellow-300 p-2">{productTitle}</h3>

          <div className="overflow-auto">
            <table className="w-full border text-sm rtl text-right">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2 border">اسم الباقة</th>
                  <th className="p-2 border">رأس المال</th>
                  {groups.map((group) => (
                    <th key={group.id} className="p-2 border">{group.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.isArray(productPackages) &&
                  productPackages.map((pkg) => (
                    <tr key={pkg.id}>
                      <td className="p-2 border">{pkg.name}</td>
                      <td className="p-2 border text-center">
                        <div className="flex gap-2 items-center justify-center">
                          <input
                            type="number"
                            value={basePrices[pkg.id] ?? ''}
                            onChange={(e) => handleBasePriceChange(pkg.id, e.target.value)}
                            className="border px-2 py-1 w-20 rounded"
                          />
                          <button
                            onClick={() => handleSaveBasePrice(pkg.id)}
                            className="text-blue-600 hover:underline"
                          >
                            حفظ
                          </button>
                        </div>
                      </td>
                      {groups.map((group) => {
                        const key = `${pkg.id}_${group.id}`;
                        return (
                          <td key={key} className="p-2 border">
                            <div className="flex gap-2 items-center">
                              <input
                                type="number"
                                className="border px-2 py-1 w-20 rounded"
                                value={prices[key] ?? ''}
                                onChange={(e) =>
                                  handleChange(pkg.id, group.id, e.target.value)
                                }
                              />
                              <button
                                onClick={() => handleSave(pkg.id, group.id)}
                                className="text-blue-600 hover:underline"
                              >
                                حفظ
                              </button>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PriceGroups;
