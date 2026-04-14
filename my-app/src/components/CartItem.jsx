import React from 'react'

export default function CartItem({title,price,quantity}) {
  return (
    <div className="flex justify-between items-center bg-white p-4 mb-3 rounded-lg shadow-sm border border-gray-100 transition-shadow hover:shadow-md">
      <div className="font-medium text-gray-800 text-lg w-1/2 line-clamp-1">{title}</div>
      <div className="text-gray-500 font-medium">Qty: {quantity}</div>
      <div className="font-bold text-indigo-600 text-xl">${(quantity * price).toFixed(2)}</div>
    </div>
  )
}
