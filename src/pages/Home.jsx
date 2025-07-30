import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('apiToken'); // مكان حفظ التوكن في المتصفح

        const res = await axios.get('https://watan-store-app-2742b6ac556c.herokuapp.com/api/products/', {
          headers: {
            'X-API-TOKEN': token,
          },
        });

        setProducts(res.data);
      } catch (error) {
        console.error('حدث خطأ أثناء تحميل المنتجات:', error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 mt-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="بحث عن منتج..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4">
        {filteredProducts.map((product, index) => (
          <ProductCard
            key={index}
            title={product.title}
            slug={product.slug}
            image={`https://watan-store-app-2742b6ac556c.herokuapp.com${product.image}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
