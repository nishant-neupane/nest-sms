"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    company_name: "",
    email: "",
    password: "",
    agree: false,
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agree) {
      toast.error("Please agree to the terms and conditions.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://192.168.112.19:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Signup successful! Please check your email/OTP.");
        setFormData({
          full_name: "",
          phone: "",
          company_name: "",
          email: "",
          password: "",
          agree: false,
        });
        setTimeout(() => router.push("/dashboard"), 1000);
      } else {
        toast.error(data.message || "Signup failed. Try again.");
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
            Already have an account?{" "}
            <Link href="/login" className="text-[#2375E0] font-bold">
              Sign In
            </Link>
          </p>
        </div>

        <div className="px-8 pt-8">
          <h2 className="font-[700] text-[40px] text-black mb-4">
            Sign up to get started
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="full_name"
                className="font-medium text-lg leading-5 text-black"
              >
                Full Name
              </label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                placeholder="Enter your full name"
                value={formData.full_name}
                onChange={handleChange}
                required
                className="w-full border border-[#A6A6A6] rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2375E0] font-medium text-base leading-6 text-[#A6A6A6]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="phone"
                  className="font-medium text-lg leading-5 text-black"
                >
                  Mobile Number
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Enter your mobile number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full border border-[#A6A6A6] rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2375E0] font-medium text-base leading-6 text-[#A6A6A6]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="company_name"
                  className="font-medium text-lg leading-5 text-black"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="company_name"
                  name="company_name"
                  placeholder="Enter your company name"
                  value={formData.company_name}
                  onChange={handleChange}
                  className="w-full border border-[#A6A6A6] rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2375E0] font-medium text-base leading-6 text-[#A6A6A6]"
                />
              </div>
            </div>

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
                className="w-full border border-[#A6A6A6] rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2375E0]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-10 text-gray-400 cursor-pointer"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="agree"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="w-4 h-4 accent-[#2375E0]"
              />
              <label htmlFor="agree" className="text-sm">
                I agree to the{" "}
                <a href="#" className="text-[#2375E0] underline">
                  terms and conditions
                </a>
                .
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2375E0] text-white py-2.5 rounded-lg font-semibold hover:scale-[1.03] transition-all duration-300 cursor-pointer"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>

            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-[#A6A6A6]"></div>
              <span className="px-2 text-sm text-gray-500">or</span>
              <div className="flex-grow h-px bg-[#A6A6A6]"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="w-full flex items-center justify-center border border-[#A6A6A6] rounded-lg py-2 hover:scale-[1.03] transition-all duration-300 cursor-pointer font-medium text-base leading-6 text-black"
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
                className="w-full flex items-center justify-center border border-[#A6A6A6] rounded-lg py-2 hover:scale-[1.03] transition-all duration-300 cursor-pointer font-medium text-base leading-6 text-black"
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
          </form>
        </div>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </AuthLayout>
  );
}
