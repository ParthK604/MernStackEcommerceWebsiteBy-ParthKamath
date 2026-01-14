import { useForm, Watch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContexts";



export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate=useNavigate();
  const {checkAuth}=useAuth();
  const onSubmit =async (data) => {
    console.log(data);
    try {
      const res=await fetch("http://localhost:3000/api/auth/login",{
      method:"POST",
      headers: { "Content-Type": "application/json" },
      credentials:"include",
      body: JSON.stringify(data),
      
      });
      if (res.ok) {
        await checkAuth();
        navigate("/items");
      } else {
        alert("passwords dont match");
        
      }
    } catch (err) {
      console.error("Error",err);
    }
  };

  return (
    <div className="bg-purple-900 mx-auto w-[45vw] mt-5 h-fit flex flex-col gap-3 p-10 font-bold text-white text-2xl rounded-2xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        
        
        <div className="mt-8">
          <input
            type="text"
            className="bg-pink-950 rounded-xl font-black"
            placeholder="Username"
            {...register("loginuser", {
              required: { value: true, message: "This Field is required" },
              maxLength: { value: 12, message: "Name Limit Exceeded" },
            })}
          />
          {errors.loginuser && <p>{errors.loginuser.message}</p>}
        </div>

        <div className="mt-8">
          <input
            type="password"
            className="bg-pink-950 rounded-xl font-black"
            placeholder="Password"
            {...register("loginpass", {
              required: { value: true, message: "This Field is required" },
            })}
          />
          {errors.loginpass && <p>{errors.loginpass.message}</p>}
        </div>

        <button type="submit" className="mt-5 bg-white text-purple-900 p-2 rounded-xl cursor-pointer">
          Login
        </button>

        

      </form>
</div>

  );
}
