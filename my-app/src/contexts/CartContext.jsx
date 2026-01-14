import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const exists = prevCart.find(p => p.id === product.id);

      if (exists) {
        return prevCart.map(p =>
          p.id === product.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (product) => {
    setCart(prevCart => {
      const exists = prevCart.find(p => p.id === product.id);

      if (!exists) return prevCart;

      if (exists.quantity === 1) {
        
        return prevCart.filter(p => p.id !== product.id);
      }

      return prevCart.map(p =>
        p.id === product.id
          ? { ...p, quantity: p.quantity - 1 }
          : p
      );
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const cartcount=cart.reduce((sum,item)=>sum+item.quantity,0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, totalPrice,cartcount }} >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
