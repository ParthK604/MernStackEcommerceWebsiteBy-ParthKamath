import React from "react";
import { useCart } from "../contexts/CartContext";
import CartItem from "../components/CartItem";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, totalPrice } = useCart();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const placeOrder = async (formdata, statusMode) => {
    try {
      const res = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          items: cart,
          address: formdata.address,
          totalAmount: totalPrice,
          status: statusMode,
        }),
      });
      if (res.ok) {
        navigate("/finalsuccess");
      } else {
        alert("Something went wrong");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCOD = (formdata) => {
    placeOrder(formdata, "PLACED");
  };

  const handleRazorpay = async (formdata) => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      const result = await fetch("http://localhost:3000/api/orders/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ amount: totalPrice }),
      });
      if (!result.ok) {
        alert("Server error. Please ensure you are logged in.");
        return;
      }
      const order = await result.json();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
        amount: order.amount,
        currency: "INR",
        name: "EcomStore",
        description: "Test Transaction",
        order_id: order.id,
        handler: async function (response) {
          // Only on successful payment, call the backend to place the order
          await placeOrder(formdata, "PAID");
        },
        prefill: {
          name: "Test User",
          contact: "9999999999",
        },
        theme: {
          color: "#4f46e5",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Razorpay Error:", error);
    }
  };

  if (!cart.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-50">
        <h2 className="text-3xl font-bold text-gray-700 mb-4">Your Cart is Empty</h2>
        <button 
          onClick={() => navigate("/")} 
          className="px-8 py-3 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-all transform hover:-translate-y-1 font-semibold"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-3xl shadow-xl border border-gray-100">
        <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-900 tracking-tight">Review Your Order</h1>

        <div className="space-y-4">
          {cart.map((item, idx) => (
            <CartItem key={idx} title={item.title} price={item.price} quantity={item.quantity} />
          ))}
        </div>

        <div className="flex justify-end mt-10 border-t pt-8">
          <div className="text-2xl font-black text-gray-900">
            Total Amount: <span className="text-indigo-600 ml-2">${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <form className="mt-10 bg-indigo-50/50 p-8 rounded-2xl border border-indigo-100">
          <label className="block text-gray-800 font-bold mb-3 text-lg">Delivery Address</label>
          <textarea
            className="w-full resize-none border-2 border-indigo-200 p-4 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 focus:outline-none transition-all shadow-inner text-gray-700"
            rows="3"
            placeholder="Enter your complete delivery address"
            {...register("address", { required: "Address is required" })}
          ></textarea>
          {errors.address && <p className="text-red-500 text-sm mt-2">{errors.address.message}</p>}

          <div className="mt-8 flex flex-col sm:flex-row gap-5">
            <button 
              type="button" 
              onClick={handleSubmit(handleCOD)}
              className="flex-1 bg-white border-2 border-gray-300 text-gray-800 py-4 px-6 rounded-xl font-bold text-lg shadow-sm hover:shadow-md hover:bg-gray-50 transform transition"
            >
              Cash on Delivery (COD)
            </button>
            
            <button 
              type="button" 
              onClick={handleSubmit(handleRazorpay)}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform transition hover:-translate-y-1 hover:scale-[1.02]"
            >
              Pay Online (Razorpay)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Cart;
