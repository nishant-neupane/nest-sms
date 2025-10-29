"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

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
      const res = await fetch(`/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Signup failed!");
        return;
      }

      toast.success("Signup successful!");
      setTimeout(() => router.push("/login"), 1000);
    } catch (error) {
      toast.error("Network error! Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-5 bg-[#E9EFF7] gap-8 p-6">
      <div className="p-8 bg-white rounded-xl md:col-span-3">
        <div className="flex justify-between items-center mb-6">
          <Image
            src="/images/auth/nest-logo.png"
            alt="Nest Logo"
            width={190}
            height={50}
            className="object-contain"
          />
          <p className="font-medium text-base leading-6 text-black">
            Already have an account?{" "}
            <Link href="/login" className="text-[#2375E0] font-bold">
              Sign In
            </Link>
          </p>
        </div>

        <div className="px-8 pt-8">
          <h2 className="font-bold text-[40px] text-black mb-4">
            Sign up to get started
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="font-medium text-lg text-black">
                Full Name
              </label>
              <input
                type="text"
                name="full_name"
                placeholder="Enter your full name"
                value={formData.full_name}
                onChange={handleChange}
                required
                className="w-full border border-[#A6A6A6] rounded-lg p-2.5 focus:ring-2 focus:ring-[#2375E0]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-medium text-lg text-black">
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter your mobile number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full border border-[#A6A6A6] rounded-lg p-2.5 focus:ring-2 focus:ring-[#2375E0]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-medium text-lg text-black">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company_name"
                  placeholder="Enter company name (optional)"
                  value={formData.company_name}
                  onChange={handleChange}
                  className="w-full border border-[#A6A6A6] rounded-lg p-2.5 focus:ring-2 focus:ring-[#2375E0]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-medium text-lg text-black">Email</label>
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
              <label className="font-medium text-lg text-black">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border border-[#A6A6A6] rounded-lg p-2.5 focus:ring-2 focus:ring-[#2375E0]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-12 text-gray-400"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="w-4 h-4 accent-[#2375E0]"
              />
              <label className="text-sm">
                I agree to the{" "}
                <a href="#" className="text-[#2375E0] underline">
                  terms & conditions
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2375E0] text-white py-2.5 rounded-lg font-semibold hover:scale-[1.03] disabled:opacity-50 transition"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
        </div>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>

      <div className="bg-[#2375E0] rounded-xl md:col-span-2">
        <Image
          src="/images/auth/right-bg.png"
          alt="Auth Background"
          width={490}
          height={400}
        />
      </div>
    </div>
  );
}
