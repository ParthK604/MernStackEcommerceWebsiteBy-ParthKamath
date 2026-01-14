import React from 'react'

function CartItem({title,price,quantity}) {
  return (
    <div className="flex justify-between border p-2 m-2">
    <span>{title}</span>
    <span>{quantity}</span>
    <span>{quantity*price}</span>
    </div>
  )
}

export default CartItem
