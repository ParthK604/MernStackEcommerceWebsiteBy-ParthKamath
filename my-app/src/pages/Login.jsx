import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContexts";
const API = import.meta.env.VITE_API_URL;


export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { checkAuth } = useAuth();

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (res.ok) {
        await checkAuth();
        navigate("/items");
      } else {
        alert("passwords dont match");
      }
    } catch (err) {
      console.error("Error", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="bg-white w-full max-w-md p-8 sm:p-10 rounded-2xl shadow-xl flex flex-col gap-6">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 tracking-tight">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-900 shadow-sm"
              placeholder="Enter your username"
              {...register("loginuser", {
                required: { value: true, message: "This Field is required" },
                maxLength: { value: 12, message: "Name Limit Exceeded" },
              })}
            />
            {errors.loginuser && <p className="text-red-500 text-sm mt-1">{errors.loginuser.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-900 shadow-sm"
              placeholder="Enter your password"
              {...register("loginpass", {
                required: { value: true, message: "This Field is required" },
              })}
            />
            {errors.loginpass && <p className="text-red-500 text-sm mt-1">{errors.loginpass.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200 transition-all shadow-md mt-4 text-lg"
          >
            Login
          </button>

          <div className="text-center mt-6">
            <span className="text-gray-600 text-sm">Don't have an account? </span>
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-indigo-600 hover:text-indigo-800 font-bold text-sm transition-colors"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
