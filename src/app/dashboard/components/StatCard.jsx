import { ArrowUpRight, ChevronUp } from "lucide-react";

export const StatCard = ({ title, value, subtitle, gradient = false, icon }) => (
  <div
    className={`${
      gradient
        ? "bg-gradient-to-b from-[#146DE1] to-[#4A98FF] text-white"
        : "bg-white"
    } p-5 rounded-xl shadow-sm`}
  >
    <h3
      className={`font-medium text-lg ${
        gradient ? "text-white" : "text-black"
      } mb-2 leading-[100%] flex gap-2 justify-between items-center`}
    >
      {title}
      <div
        className={`${
          gradient ? "bg-white" : "border border-black"
        } p-0.5 rounded-full`}
      >
        <ArrowUpRight
          color={gradient ? "#176FE2" : "#000"}
          strokeWidth={1.5}
          size={20}
        />
      </div>
    </h3>
    <p
      className={`font-bold text-[50px] ${
        gradient ? "text-white" : "text-black"
      } mb-2 leading-[100%]`}
    >
      {value}
    </p>
    {subtitle && (
      <p
        className={`font-medium text-sm ${
          gradient ? "text-white" : "text-[#4A98FF]"
        } mt-2 leading-[100%] flex gap-1 items-center`}
      >
        {icon && <ChevronUp color={gradient ? "#fff" : "#4A98FF"} size={20} />}
        {subtitle}
      </p>
    )}
  </div>
);