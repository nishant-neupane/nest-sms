"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Invalid credentials");
        return;
      }

      toast.success("Login Successful!");
      setTimeout(() => router.push("/dashboard"), 1500);
    } catch (error) {
      console.error(error);
      toast.error("Network error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#E9EFF7] p-6 ">
      <div className=" grid grid-cols-1 md:grid-cols-5  gap-8  justify-center items-center overflow-hidden">
        <div className="p-8 h-full bg-white rounded-xl md:col-span-3 flex flex-col justify-center ">
          <div className="w-full max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <Image
                src="/images/auth/nest-logo.png"
                alt="Nest Logo"
                width={190}
                height={50}
                className="object-contain"
              />
              <p className="font-medium text-base text-black">
                Don't have an account?{" "}
                <Link href="/signup" className="text-[#2375E0] font-bold">
                  Sign Up
                </Link>
              </p>
            </div>
            <div className="px-8 ">
              <h2 className="font-bold text-[40px] text-black mb-2">
                Login to your account
              </h2>
              <p className="font-medium text-lg text-black/70 mb-2">
                Please enter your information to access your account.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <button className="w-full flex items-center justify-center border border-[#A6A6A6] rounded-lg py-2.5 hover:scale-[1.03] duration-300">
                  <Image
                    src="/images/auth/google.png"
                    width={20}
                    height={20}
                    alt="Google"
                    className="mr-2"
                  />
                  Log in with Google
                </button>

                <button className="w-full flex items-center justify-center border border-[#A6A6A6] rounded-lg py-2.5 hover:scale-[1.03] duration-300">
                  <Image
                    src="/images/auth/facebook.png"
                    width={20}
                    height={20}
                    alt="Facebook"
                    className="mr-2"
                  />
                  Log in with Facebook
                </button>
              </div>

              <div className="flex items-center my-2">
                <div className="flex-grow h-px bg-[#A6A6A6]"></div>
                <span className="px-2 text-sm text-gray-500">or</span>
                <div className="flex-grow h-px bg-[#A6A6A6]"></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-lg text-black">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-[#A6A6A6] rounded-lg p-2.5 focus:ring-2 focus:ring-[#2375E0]"
                  />
                </div>

                <div className="flex flex-col gap-2 relative">
                  <label className="font-medium text-lg text-black">
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full border border-[#A6A6A6] rounded-lg p-2.5 focus:ring-2 focus:ring-[#2375E0]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-12 text-gray-400 cursor-pointer"
                  >
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>

                  <div className="text-right mt-1">
                    <Link
                      href="/forgot-password"
                      className="text-[#2375E0] text-base hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#2375E0] text-white py-2.5 rounded-lg font-semibold hover:scale-[1.03] duration-300 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>

              <p className="text-center text-sm text-[#A6A6A6] mt-8">
                © 2025. All rights reserved.
              </p>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
          </div>
        </div>

        <div className="bg-[#2375E0] rounded-xl md:col-span-2 ">
          <Image
            src={"/images/auth/right-bg.png"}
            height={400}
            width={490}
            alt="Auth Background"
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}
