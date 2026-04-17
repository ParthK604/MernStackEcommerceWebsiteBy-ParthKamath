import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContexts";
import { useCart } from "../contexts/CartContext";
const API = import.meta.env.VITE_API_URL;

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, user } = useAuth();
  const { cartcount } = useCart();

  const logout = async () => {
    await fetch(`${API}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="sticky top-0 z-50 w-full bg-indigo-600 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center py-4 px-4 sm:px-6 gap-4 sm:gap-0">

        {/* Brand and Cart Section */}
        <div className="flex flex-row items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
          <div
            className="font-extrabold text-2xl sm:text-3xl text-white cursor-pointer tracking-tight hover:text-indigo-100 transition-colors"
            onClick={() => navigate("/")}
          >
            EcomStore
          </div>
          <div className="bg-indigo-800 text-indigo-50 px-3 py-1.5 rounded-full text-sm font-semibold shadow-inner border border-indigo-700 flex items-center">
            Cart
            <span className="bg-indigo-500 text-white ml-2 px-2 py-0.5 rounded-full text-xs box-content font-bold">
              {cartcount}
            </span>
          </div>
        </div>

        {/* Action Buttons Section */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-end">
          {!isLoggedIn ? (
            <>
              <button
                className="text-white hover:bg-indigo-700 border border-transparent hover:border-indigo-400 px-5 py-2.5 rounded-lg font-semibold transition-all w-full sm:w-auto text-center shadow-sm"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="bg-white text-indigo-600 hover:bg-gray-50 px-5 py-2.5 rounded-lg font-bold shadow-md hover:shadow-lg transition-all w-full sm:w-auto text-center"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <div className="font-semibold px-4 py-2.5 bg-indigo-800 text-indigo-100 rounded-lg shadow-inner truncate max-w-[150px] sm:max-w-xs text-center border border-indigo-700">
                Hi, {user?.usern || "User"}
              </div>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all w-full sm:w-auto text-center"
                onClick={logout}
              >
                Logout
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default Navbar;
