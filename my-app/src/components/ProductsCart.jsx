import React from 'react';
import AddToCartButton from './AddToCartButton';

function ProductsCart({ title, image, description, price, showaddtocartbutton = false, onAddToCart }) {
  return (
    <div className='bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 w-[22rem] flex flex-col overflow-hidden border border-gray-100 m-2 group'>
      <div className="h-64 bg-gray-100 p-4 flex items-center justify-center overflow-hidden">
        <img className='object-contain h-full w-full group-hover:scale-105 transition-transform duration-300'
          src={image} alt={title}
          onError={(e) => {
            e.target.src = `https://source.unsplash.com/300x300/?${title || "product"}`;
          }}
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className='font-bold text-lg text-gray-800 line-clamp-1 mb-1'>{title}</h3>
        <p className='text-sm text-gray-500 line-clamp-2 mb-3 flex-grow'>{description}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className='font-extrabold text-xl text-indigo-600'>₹{price}</span>
          {showaddtocartbutton && (
            <AddToCartButton onAdd={onAddToCart} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductsCart;
