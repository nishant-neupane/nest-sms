import { ArrowUpRight } from "lucide-react";

export const SplitStatCard = ({
  title,
  leftValue,
  leftLabel,
  rightValue,
  rightLabel,
}) => (
  <div className="bg-white p-5 rounded-xl shadow-sm">
    <h3 className="font-medium text-lg text-black mb-2 leading-[100%] flex gap-2 justify-between items-center">
      {title}
      <div className="border border-black p-0.5 rounded-full">
        <ArrowUpRight color="#000" strokeWidth={1.5} size={20} />
      </div>
    </h3>
    <div className="grid grid-cols-2 justify-center items-center">
      <div className="flex flex-col justify-center items-center relative">
        <div className="absolute w-[2px] bg-black h-[50px] -right-1 top-0"></div>
        <p className="font-bold text-[50px] text-black mb-2 leading-[100%]">
          {leftValue}
        </p>
        <p className="font-medium text-sm leading-[100%] text-[#4A98FF]">
          {leftLabel}
        </p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="font-bold text-[50px] text-black mb-2 leading-[100%]">
          {rightValue}
        </p>
        <p className="font-medium text-sm leading-[100%] text-[#4A98FF]">
          {rightLabel}
        </p>
      </div>
    </div>
  </div>
);
