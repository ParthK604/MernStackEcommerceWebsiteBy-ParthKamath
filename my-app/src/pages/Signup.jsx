import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const checked = watch("terms", false);
  const navigate = useNavigate();
  const password = watch("pass");
  
  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        navigate("/success");
      } else {
        alert("Something went wrong!");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };
   
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white w-full max-w-2xl p-6 sm:p-10 rounded-2xl shadow-xl flex flex-col gap-8">
        <div className="text-center">
          <h2 className="font-extrabold text-4xl text-gray-900 tracking-tight">Create Account</h2>
          <p className="mt-2 text-gray-600 font-medium">Join us to start shopping today!</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-900 shadow-sm"
                placeholder="First Name"
                {...register("fname", {
                  required: { value: true, message: "Required" },
                  maxLength: { value: 20, message: "Limit Exceeded" },
                })}
              />
              {errors.fname && <p className="text-red-500 text-sm mt-1">{errors.fname.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-900 shadow-sm"
                placeholder="Last Name"
                {...register("lname", {
                  required: { value: true, message: "Required" },
                  maxLength: { value: 20, message: "Limit Exceeded" },
                })}
              />
              {errors.lname && <p className="text-red-500 text-sm mt-1">{errors.lname.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-900 shadow-sm"
                placeholder="Unique username"
                {...register("usern", {
                  required: { value: true, message: "Required" },
                  maxLength: { value: 12, message: "Limit Exceeded" },
                })}
              />
              {errors.usern && <p className="text-red-500 text-sm mt-1">{errors.usern.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email (Optional)</label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-900 shadow-sm"
                placeholder="Email Address"
                {...register("email", {
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email",
                  },
                })}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="sm:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
              <input
                type="number"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-900 shadow-sm"
                placeholder="18+"
                {...register("age", {
                  required: { value: true, message: "Required" },
                  min: { value: 18, message: "Must be 18+" },
                  max: { value: 99, message: "Limit 99" },
                })}
              />
              {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
            </div>

            <div className="sm:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
              <select 
                {...register("gender")} 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-900 shadow-sm appearance-none"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="sm:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
              <input
                type="number"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-900 shadow-sm"
                placeholder="10 Digits"
                {...register("phno", {
                  required: { value: true, message: "Required" },
                  minLength: { value: 10, message: "10 digits required" },
                  maxLength: { value: 10, message: "10 digits required" },
                  pattern: { value: /^[0-9]{10}$/, message: "Invalid format" },
                })}
              />
              {errors.phno && <p className="text-red-500 text-sm mt-1">{errors.phno.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-900 shadow-sm"
                placeholder="Create Password"
                {...register("pass", {
                  required: { value: true, message: "Required" },
                  minLength: { value: 8, message: "Min 8 chars" },
                  maxLength: { value: 12, message: "Max 12 chars" },
                })}
              />
              {errors.pass && <p className="text-red-500 text-sm mt-1">{errors.pass.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-gray-900 shadow-sm"
                placeholder="Confirm Password"
                {...register("cfpass", {
                  required: { value: true, message: "Required" },
                  validate: (value) => value === password || "Passwords do not match",
                })}
              />
              {errors.cfpass && <p className="text-red-500 text-sm mt-1">{errors.cfpass.message}</p>}
            </div>
          </div>

          <div className="mt-6 flex items-center pt-2">
            <input
              id="terms"
              type="checkbox"
              className="w-5 h-5 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
              {...register("terms", {
                required: { value: true, message: "You must accept the terms" },
              })}
            />
            <label htmlFor="terms" className="ml-3 text-sm font-medium text-gray-700 cursor-pointer">
              I accept the <a href="#" className="text-indigo-600 hover:underline">Terms and Conditions</a>
            </label>
          </div>
          {errors.terms && <p className="text-red-500 text-sm mt-1">{errors.terms.message}</p>}

          <button
            type="submit"
            disabled={!checked}
            className={`w-full font-bold py-3.5 rounded-xl shadow-md transition-all text-lg mt-6 ${
              checked 
                ? "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200" 
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Create Account
          </button>
          
          <div className="text-center pt-4 border-t mt-6">
            <span className="text-gray-600 text-sm">Already have an account? </span>
            <button 
              type="button"
              onClick={() => navigate("/login")} 
              className="text-indigo-600 hover:text-indigo-800 font-bold text-sm transition-colors"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
