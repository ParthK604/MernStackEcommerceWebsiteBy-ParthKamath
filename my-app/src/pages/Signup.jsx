import Login from "./Login";
import {useForm} from "react-hook-form"
import { useNavigate } from 'react-router-dom';

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
    <>
     
            <form
              className="bg-purple-900 mx-auto w-[45vw] mt-5 h-fit flex flex-col gap-3 p-10 font-bold text-white text-2xl rounded-2xl"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mx-auto">
                <span className="font-extrabold text-5xl">Sign Up</span>
              </div>

              
              <div className="mt-8">
                <span className="mr-4">Enter Your Last Name :</span>
                <input
                  type="text"
                  className="bg-pink-950 rounded-xl font-black"
                  placeholder="Last Name"
                  {...register("lname", {
                    required: { value: true, message: "This Field is required" },
                    maxLength: { value: 20, message: "Name Limit Exceeded" },
                  })}
                />
                {errors.lname && <p>{errors.lname.message}</p>}
              </div>

             
              <div className="mt-8">
                <span className="mr-4">Enter Your First Name :</span>
                <input
                  type="text"
                  className="bg-pink-950 rounded-xl font-black"
                  placeholder="First Name"
                  {...register("fname", {
                    required: { value: true, message: "This Field is required" },
                    maxLength: { value: 20, message: "Name Limit Exceeded" },
                  })}
                />
                {errors.fname && <p>{errors.fname.message}</p>}
              </div>

             
              <div className="mt-8">
                <span className="mr-4">Enter Your Email (optional) :</span>
                <input
                  type="email"
                  className="bg-pink-950 rounded-xl font-black"
                  placeholder="Email"
                  {...register("email", {
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                />
                {errors.email && <p className="text-sm">{errors.email.message}</p>}
              </div>

             
              <div className="mt-8">
                <span className="mr-4">Enter Your Phone Number :</span>
                <input
                  type="number"
                  className="bg-pink-950 rounded-xl font-black"
                  placeholder="Phone Number"
                  {...register("phno", {
                    required: { value: true, message: "This Field is required" },
                    minLength: { value: 10, message: "Phone number invalid" },
                    maxLength: { value: 10, message: "Phone number invalid" },
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "No alphabets allowed",
                    },
                  })}
                />
                {errors.phno && <p>{errors.phno.message}</p>}
              </div>

           
              <div className="mt-8">
                <span className="mr-4">Set Your Password :</span>
                <input
                  type="password"
                  className="bg-pink-950 rounded-xl font-black"
                  placeholder="Password"
                  {...register("pass", {
                    required: { value: true, message: "This Field is required" },
                    minLength: {
                      value: 8,
                      message: "Password should be greater than 8 characters",
                    },
                    maxLength: {
                      value: 12,
                      message: "Password should be less than 12 characters",
                    },
                  })}
                />
                {errors.pass && <p>{errors.pass.message}</p>}
              </div>

         
              <div className="mt-8">
                <span className="mr-4">Confirm Password :</span>
                <input
                  type="password"
                  className="bg-pink-950 rounded-xl font-black"
                  placeholder="Confirm Password"
                  {...register("cfpass", {
                    required: { value: true, message: "This Field is required" },
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
                {errors.cfpass && <p>{errors.cfpass.message}</p>}
              </div>

            
              <div className="mt-8">
                <span className="mr-4">Select Your Gender</span>
                <select {...register("gender")} className="border text-black rounded-lg p-1">
                  <option value="male">male</option>
                  <option value="female">female</option>
                  <option value="other">other</option>
                </select>
              </div>

              
              <div className="mt-8">
                <span className="mr-4">Enter Your Age</span>
                <input
                  type="number"
                  className="bg-pink-950 rounded-xl font-black"
                  placeholder="Age"
                  {...register("age", {
                    required: { value: true, message: "This field is required" },
                    min: { value: 18, message: "You must be at least 18 years old" },
                    max: { value: 99, message: "Age cannot exceed 99" },
                  })}
                />
                {errors.age && <p>{errors.age.message}</p>}
              </div>

              
              <div className="mt-8">
                <span className="mr-4">Enter Your Username on this website:</span>
                <input
                  type="text"
                  className="bg-pink-950 rounded-xl font-black"
                  placeholder="Username"
                  {...register("usern", {
                    required: { value: true, message: "This Field is required" },
                    maxLength: { value: 12, message: "Name Limit Exceeded" },
                  })}
                />
                {errors.usern && <p>{errors.usern.message}</p>}
              </div>

              
              <div className="mt-8">
                <input
                  type="checkbox"
                  {...register("terms", {
                    required: { value: true, message: "This field is required" },
                  })}
                />
                <span className="ml-2">Do you accept the terms and conditions</span>
                {errors.terms && <p className="text-red-400">{errors.terms.message}</p>}
              </div>

              <button
                type="submit"
                disabled={!checked}
                className={`cursor-pointer bg-white text-purple-900 p-2 rounded-xl mt-5 hover:bg-purple-300 transition ${
                  !checked ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Sign Up
              </button>
              
            
              <div>
                or Already Have An Account ?
              </div>
              <button onClick={()=>navigate("/login")} className="cursor-pointer bg-white text-purple-900 p-2 rounded-xl mt-5 hover:bg-purple-300 transition">
                Login 
              </button>
            </form>
    </>
  );
}
