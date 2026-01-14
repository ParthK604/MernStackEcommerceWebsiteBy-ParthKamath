import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

function FinalPage() {
  const navigate = useNavigate();
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4 bg-green-50">
      <h1 className="text-3xl font-bold text-green-700">
         Order Placed Successfully!
      </h1>

      <p className="text-lg text-gray-700 text-center">
        You can now safely close the tab<br />
        or continue ordering.
      </p>

      <button
        onClick={() => navigate("/items")}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition"
      >
        Continue Ordering
      </button>
    </div>
  );
}

export default FinalPage;
