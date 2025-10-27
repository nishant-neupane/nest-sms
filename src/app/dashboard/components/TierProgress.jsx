export const TierProgress = () => {
  const percentage = 41;
  const radius = 50;
  const circumference = Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white p-6 rounded-lg">
      <h2 className="font-semibold text-gray-800 mb-3">
        Current Tier: <span className="text-gray-700">Silver</span>
      </h2>
      <div className="relative flex items-center justify-center max-h-[120px] 2xl:max-h-[160px] overflow-hidden">
        <svg
          className="w-80 h-80 rotate-360"
          viewBox="0 0 120 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10,60 A50,50 0 0,1 110,60"
            stroke="#F0F6FF"
            strokeWidth="20"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M10,60 A50,50 0 0,1 110,60"
            stroke="#4493FB"
            strokeWidth="20"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute bottom-3 text-center">
          <p className="font-medium text-[40px] leading-[100%] text-[#4493FB]">
            {percentage}%
          </p>
          <p className="font-medium text-sm leading-[100%] text-[#89BCFF]">
            Till next tier
          </p>
        </div>
      </div>
      <p className="font-light text-sm leading-[100%] text-[#4493FB] mt-2">
        29,999 remaining for{" "}
        <span className="text-base font-semibold">Gold Tier</span>
      </p>
    </div>
  );
};
