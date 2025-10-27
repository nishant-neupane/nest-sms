import { ArrowUpRight } from "lucide-react";

export const SenderIDCard = () => (
  <div className="bg-white p-5 rounded-xl shadow-sm h-full flex flex-col justify-between">
    <h3 className="font-medium text-lg text-black mb-2 leading-[100%] flex gap-2 justify-between items-center">
      Sender IDs
      <div className="border border-black p-0.5 rounded-full">
        <ArrowUpRight color="#000" strokeWidth={1.5} size={20} />
      </div>
    </h3>
    <div className="grid grid-cols-2 justify-center items-center">
      <div className="flex flex-col justify-center items-center relative">
        <div className="absolute w-[2px] bg-black h-[50px] -right-1 top-0"></div>
        <p className="font-bold text-[50px] text-black mb-2 leading-[100%]">
          1
        </p>
        <p className="font-medium text-sm leading-[100%] text-[#4A98FF]">
          Shared
        </p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="font-bold text-[50px] text-black mb-2 leading-[100%]">
          0
        </p>
        <p className="font-medium text-sm leading-[100%] text-[#4A98FF]">
          Dedicated
        </p>
      </div>
    </div>
    <div className="flex justify-center items-center">
      <button className="font-bold text-base text-white bg-gradient-to-b from-[#005FDB] to-[#2584FF] w-full py-2 rounded-full max-w-[170px] hover:scale-[1.03] transition-all duration-300 cursor-pointer">
        Send SMS
      </button>
    </div>
  </div>
);
