"use client";
import Image from "next/image";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-5 bg-[#E9EFF7] gap-8 p-6">
      <div className="p-8 bg-white rounded-xl md:col-span-3 ">
        {children}
      </div>

      <div className="bg-[#2375E0] rounded-xl md:col-span-2">
        <Image
          src={"/images/auth/right-bg.png"}
          height={400}
          width={490}
          alt="Auth Background"
          className="h-full w-full "
        />
      </div>
    </div>
  );
}
