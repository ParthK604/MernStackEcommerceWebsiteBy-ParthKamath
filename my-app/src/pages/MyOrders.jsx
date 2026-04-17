import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
const API = import.meta.env.VITE_API_URL;


function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${API}/api/orders/myorders`, {
          credentials: "include"
        });
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        } else {
          console.error("Failed to fetch orders");
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 pt-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">My Orders</h1>

        {loading ? (
          <div className="text-center text-gray-600 text-xl py-10">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-center text-gray-600 text-xl py-10 bg-white rounded-lg shadow-sm">
            No orders yet.
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                <div className="bg-gray-50 px-6 py-4 border-b flex flex-wrap justify-between items-center gap-4">
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Order ID</p>
                    <p className="font-semibold text-gray-800">{order._id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Date</p>
                    <p className="font-semibold text-gray-800">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Total Amount</p>
                    <p className="font-semibold text-indigo-600 text-lg">
                      ₹{order.totalAmount}
                    </p>
                  </div>
                  <div>
                    <span className={`px-4 py-1.5 rounded-full text-sm font-bold shadow-sm ${order.status === 'PLACED' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'PAID' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 space-y-4">
                    <h3 className="font-bold text-gray-700 border-b pb-2">Items Ordered</h3>
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center gap-3">

                          <div>
                            <p className="font-medium text-gray-800 line-clamp-1">{item.title}</p>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-semibold text-gray-700">₹{item.price * item.quantity}</p>
                      </div>
                    ))}
                  </div>

                  <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg self-start">
                    <h3 className="font-bold text-gray-700 border-b pb-2 mb-3">Delivery Address</h3>
                    <p className="text-gray-600 text-sm whitespace-pre-wrap">{order.address}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrders;
