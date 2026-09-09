import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import LoadingPage from "./LoadingPage";
const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`,{
         'email': email,
         'password': password
      },{
        withCredentials: true
      });
      navigate('/')
    } catch (error) {
      if(axios.isAxiosError(error)){
                console.log("Error status:", error.response?.status);
                console.log("Error data:", error.response?.data);
                console.log("Error message:", error.response?.data?.message);
      };
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <LoadingPage />;
  return (
    <div className="w-full flex justify-center items-center min-h-screen">
      <div className="border-2 my-10 w-80 rounded-xl">
        <p className="flex justify-center py-2 text-xl font-bold text-[#4e525a]">
         Login User
        </p>
        <form onSubmit={handleSubmit} className="px-3 flex flex-col gap-4">
          <label>
            <p className="font-semibold text-[#4e525a]">
              Email <span className="text-[#3F0091]">*</span>
            </p>
            <input
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              className="border-2 rounded-lg mt-3 pl-3 w-full py-1"
              type="text"
              placeholder="Write your email!"
              required
            />
          </label>
          <label>
            <p className="font-semibold text-[#4e525a]">
              Password <span className="text-[3F0091]">*</span>
            </p>
            <input
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              className="border-2 rounded-lg mt-3 pl-3 w-full py-1"
              type="password"
              placeholder="Write your password!"
              required
            />
          </label>

          <button
            type="submit"
            className="text-sm flex bg-black text-white font-bold justify-center items-center gap-2  transition-all duration-300 ease-in-out py-3 my-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logining..." : "Login"}
          </button>
        </form>
         <div className="flex font-semibold text-[#4e525a] text-xs justify-center"><p className="pr-2 pb-2">If you don't have account! </p> <Link className="text-[#3F0091]" to='/register' > Register</Link></div>
      </div>
    </div>
  );
};

export default Login;