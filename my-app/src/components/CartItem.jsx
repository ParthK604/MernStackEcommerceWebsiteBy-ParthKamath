import React from 'react';
import { useCart } from '../contexts/CartContext';

export default function CartItem({ item }) {
  const { addToCart, removeFromCart, deleteFromCart } = useCart();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 mb-3 rounded-lg shadow-sm border border-gray-100 transition-shadow hover:shadow-md gap-4">
      <div className="font-medium text-gray-800 text-lg sm:w-1/3 line-clamp-1">
        {item.title}
      </div>

      <div className="flex items-center gap-3 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
        <button 
          onClick={() => removeFromCart(item)}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white hover:bg-gray-200 text-gray-600 font-bold transition shadow-sm border border-gray-200"
        >
          -
        </button>
        <div className="text-gray-700 font-bold w-6 text-center select-none">{item.quantity}</div>
        <button 
          onClick={() => addToCart(item)}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white hover:bg-gray-200 text-gray-600 font-bold transition shadow-sm border border-gray-200"
        >
          +
        </button>
      </div>

      <div className="font-bold text-indigo-600 text-xl font-mono sm:w-24 text-right">
        ₹{(item.quantity * item.price).toFixed(2)}
      </div>

      <button
        onClick={() => deleteFromCart(item)}
        className="px-4 py-2 text-sm bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 rounded-lg font-bold transition shadow-sm border border-red-100 focus:ring-2 focus:ring-red-200"
      >
        Remove
      </button>
    </div>
  );
}
