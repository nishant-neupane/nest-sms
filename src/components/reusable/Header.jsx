"use client";

import { Bell } from "lucide-react";

export default function Header() {
  return (
    <div className="pb-2 sticky">
      <div className="bg-[#f9f9f9] rounded-xl flex items-center justify-between p-4  ">
        <div>
          <p className="text-sm font-medium text-[#000000]/50 ">Your Plan:</p>
          <h2 className="text-2xl font-bold text-[24px] text-[#3283EC] ">
            Basic
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-sm">
            <Bell className="text-[#949494] w-6 h-6" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#60a5fa]" />
            <div>
              <p className="text-[#3283EC] font-bold text-lg leading-none">
                Jayesh Muthmare
              </p>
              <p className="text-sm text-[#000000]/50 font-[500] leading-none mt-2">
                muthmarejayesh@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
