import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ title, image, slug }) => {
  return (
    <div className="bg-gray-800 text-white rounded shadow overflow-hidden flex flex-col hover:shadow-lg transition duration-200">
      <Link to={`/product/${slug}`}>
        <div className="w-full aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
      
      <div className="px-2 py-3 text-center text-sm font-semibold border-t border-gray-700">
        {title}
      </div>

      <div className="px-2 pb-3">
        <Link to={`/product/${slug}`}>
          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-1.5 rounded text-sm">
            شراء الآن
          </button>
        </Link>
      </div>
    </div>
  );
};


export default ProductCard;
