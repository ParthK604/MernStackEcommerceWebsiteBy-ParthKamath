import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContexts";
import { useCart } from "../contexts/CartContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn ,user} = useAuth();

  const logout = async () => {
    await fetch("http://localhost:3000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    setIsLoggedIn(false);
    navigate("/login");
  };

  const {cartcount}=useCart();

  return (
    <div className="top-0 sticky w-screen h-20 bg-blue-300 flex justify-between items-center px-6">
      <div className="font-bold text-4xl cursor-pointer flex gap-3" onClick={() => navigate("/")}>
        <div>EcomStore</div>
        <div className="text-white ">Cart Count : {cartcount}</div>
      </div>

      {!isLoggedIn && (
        <div className="flex gap-3">
          <button
            className="border p-2 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Signup
          </button>
          <button
            className="border p-2 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      )}

      {isLoggedIn && (
        <div className="flex gap-3">
          <span className="font-semibold border p-2 bg-red-400 text-green-800">
            {user?.usern}
          </span>
        <button className="border p-2 cursor-pointer" onClick={logout}>
          Logout
        </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
