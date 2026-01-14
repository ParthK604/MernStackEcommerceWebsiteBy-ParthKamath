import React from 'react'
import AddToCartButton from './AddToCartButton'


function ProductsCart({title,image,description,price,showaddtocartbutton=false,onAddToCart}) {
  return (
    <div className='border w-[25vw] h-fit p-2 m-1 cursor-pointer '>
      <img className='mx-auto' src={image} alt={title} /> <br />
      <span className='font-bold'>{title}</span> <br />
      <span>{description}</span> <br />
      <span className='font-extrabold'>${price}</span> 
      <br />
      <div>{(showaddtocartbutton) &&
      <AddToCartButton onAdd={onAddToCart} />
      } 
      </div>
       </div>
  )
}

export default ProductsCart
