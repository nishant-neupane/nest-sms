"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import AuthLayout from "@/components/auth/AuthLayout";
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
      const res = await fetch("http://192.168.112.19:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Login successful!");

        if (data.access)
          Cookies.set("access_token", data.access, { expires: 7 });
        if (data.refresh)
          Cookies.set("refresh_token", data.refresh, { expires: 7 });

        setTimeout(() => router.push("/dashboard"), 1500);
      } else {
        toast.error(data.message || "Invalid credentials. Try again.");
      }
    } catch (error) {
      toast.error("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="bg-white rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <Image
            src="/images/auth/nest-logo.png"
            alt="Nest Logo"
            width={190}
            height={50}
            className="object-contain"
          />
          <p className="font-[500] text-base leading-6 text-black">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#2375E0] font-bold">
              Sign Up
            </Link>
          </p>
        </div>

        <div className="px-8 pt-8">
          <h2 className="font-[700] text-[40px] text-black mb-4">
            Login to your account
          </h2>
          <p className="font-medium text-lg leading-6 text-black/70 mb-6">
            Please enter your information to access your account.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              type="button"
              className="w-full flex items-center justify-center border border-[#A6A6A6] rounded-lg py-2.5 hover:scale-[1.03] transition-all duration-300 cursor-pointer font-medium text-base leading-6 text-black"
            >
              <Image
                src="/images/auth/google.png"
                alt="Google"
                width={20}
                height={20}
                className="mr-2"
              />
              Log in with Google
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center border border-[#A6A6A6] rounded-lg py-2.5 hover:scale-[1.03] transition-all duration-300 cursor-pointer font-medium text-base leading-6 text-black"
            >
              <Image
                src="/images/auth/facebook.png"
                alt="Facebook"
                width={20}
                height={20}
                className="mr-2"
              />
              Log in with Facebook
            </button>
          </div>

          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-[#A6A6A6]"></div>
            <span className="px-2 text-sm text-gray-500">or</span>
            <div className="flex-grow h-px bg-[#A6A6A6]"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="font-medium text-lg leading-5 text-black"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-[#A6A6A6] rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2375E0] font-medium text-base leading-6 text-[#A6A6A6]"
              />
            </div>

            <div className="flex flex-col gap-2 relative">
              <label
                htmlFor="password"
                className="font-medium text-lg leading-5 text-black"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border border-[#A6A6A6] rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2375E0] font-medium text-base leading-6 text-[#A6A6A6]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-10 text-gray-400 cursor-pointer"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>

              <div className="text-right mt-1">
                <Link
                  href="/forgot-password"
                  className="text-[#2375E0] font-medium text-base leading-6 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2375E0] text-white py-2.5 rounded-lg font-semibold hover:scale-[1.03] transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
    </AuthLayout>
  );
}
