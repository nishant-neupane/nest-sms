import React from "react";

const Title = () => {
  return (
    <div className="flex justify-between items-center p-6">
      <div>
        <p className="font-medium text-[40px] text-black leading-7">
          Dashboard
        </p>
        <p className="text-base text-black/40 mt-2">
          Plan, prioritize, and accomplish your tasks with ease.
        </p>
      </div>
      <div className="flex gap-4">
        <button className="font-bold text-base text-white bg-gradient-to-b from-[#005FDB] to-[#2584FF] px-8 py-4 rounded-full max-w-[170px] hover:scale-[1.03] transition-all duration-300 cursor-pointer">
          Send SMS
        </button>
        <button className="font-bold text-base text-[#4A99FF] border border-[#4A99FF] px-8 py-3.5 rounded-full max-w-[170px] hover:scale-[1.03] transition-all duration-300 cursor-pointer">
          + Add Credit
        </button>
      </div>
    </div>
  );
};

export default Title;
