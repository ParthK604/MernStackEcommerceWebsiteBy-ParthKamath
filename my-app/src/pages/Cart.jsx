import React from "react";
import { useCart } from "../contexts/CartContext";
import CartItem from "../components/CartItem";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, totalPrice } = useCart();
  const navigate=useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formdata) => {
    try {
      const res=await fetch("http://localhost:3000/api/orders",{
        method:"POST",
        headers: { "Content-Type": "application/json" },
        credentials:"include",
       body: JSON.stringify({
       items: cart,
       address: formdata.address,
       totalAmount: totalPrice
     }),
      });
      if (res.ok) {
         navigate("/finalsuccess");
      } else {
        alert("something went wrong");
        
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!cart.length) {
    return (
      <h2 className="text-center text-2xl mt-10">
        The Cart is Empty
      </h2>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 border rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Your Orders
      </h1>

     
      <div className="space-y-3">
        {cart.map((item) => (
          <CartItem key={item.id}
            title={item.title}
            price={item.price}
            quantity={item.quantity}
          />
        ))}
      </div>

      
      <div className="text-xl font-bold mt-6 text-right">
        Total Cost: ${totalPrice}
      </div>

      
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-3">
        <input
          type="text"
          className="border p-2 rounded-lg"
          placeholder="Enter your address"
          {...register("address", {
            required: "Address is required",
          })}
        />
        {errors.address && (
          <p className="text-red-500 text-sm">
            {errors.address.message}
          </p>
        )}

        <button type="submit" className="bg-amber-400 hover:bg-amber-500 transition p-2 rounded-lg font-bold">
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Cart;
