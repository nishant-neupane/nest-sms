import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import React from "react";
import { ArrowUpRight, ChevronUp, UserRound } from "lucide-react";
import Image from "next/image";

const Body = () => {
  const percentage = 41;
  const radius = 50;
  const circumference = Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const data = [
    { name: "S", ntc: 40, ncell: 60 },
    { name: "M", ntc: 70, ncell: 90 },
    { name: "T", ntc: 80, ncell: 100 },
    { name: "W", ntc: 90, ncell: 120 },
    { name: "T", ntc: 60, ncell: 80 },
    { name: "F", ntc: 50, ncell: 70 },
    { name: "S", ntc: 30, ncell: 40 },
  ];
  const users = [
    {
      name: "Jayesh Nath Rawal Muthmare",
      email: "muthmarejayesh@gmail.com",
    },
    { name: "Kushal Kafle", email: "kushalkafle@gmail.com" },
    {
      name: "Jayesh Nath Rawal Muthmare",
      email: "muthmarejayesh@gmail.com",
    },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-2 space-y-6">
        <div className="grid sm:grid-cols-3 gap-2">
          <div className="bg-gradient-to-b from-[#146DE1] to-[#4A98FF] p-5 rounded-xl shadow-sm ">
            <h3 className="font-medium text-lg text-white mb-2 leading-[100%] flex gap-2 justify-between items-center">
              Current Balance{" "}
              <div className="bg-white p-0.5 rounded-full">
                <ArrowUpRight color="#176FE2" strokeWidth={1.5} size={20} />
              </div>
            </h3>
            <p className="font-bold text-[50px] text-white mb-2 leading-[100%]">
              20,000
            </p>
            <p className="font-medium text-sm text-white mt-2 leading-[100%] flex gap-1 items-center">
              <ChevronUp size={20} /> Increase from last month
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm ">
            <h3 className="font-medium text-lg text-black mb-2 leading-[100%] flex gap-2 justify-between items-center">
              Contacts
              <div className="border border-black p-0.5 rounded-full">
                <ArrowUpRight color="#000" strokeWidth={1.5} size={20} />
              </div>
            </h3>
            <div className="grid grid-cols-2 justify-center items-center">
              {" "}
              <div className=" flex flex-col justify-center items-center relative">
                <div className="absolute w-[2px] bg-black h-[50px] -right-1 top-0"></div>
                <p className="font-bold text-[50px] text-black mb-2 leading-[100%]">
                  720{" "}
                </p>{" "}
                <p className="font-medium text-sm leading-[100%] text-[#4A98FF]">
                  Individual
                </p>
              </div>{" "}
              <div className=" flex flex-col justify-center items-center">
                <p className="font-bold text-[50px] text-black mb-2 leading-[100%]">
                  120
                </p>
                <p className="font-medium text-sm leading-[100%] text-[#4A98FF]">
                  Group
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl shadow-sm ">
            <h3 className="font-medium text-lg text-black mb-2 leading-[100%] flex gap-2 justify-between items-center">
              SMS sent this month{" "}
              <div className="border border-black p-0.5 rounded-full">
                <ArrowUpRight color="#000" strokeWidth={1.5} size={20} />
              </div>
            </h3>
            <p className="font-bold text-[50px] text-black mb-2 leading-[100%]">
              220
            </p>
            <p className="font-medium text-sm text-[#4A98FF] mt-2 leading-[100%] flex gap-1 items-center">
              <ChevronUp color="#4A98FF" size={20} /> Increase from last month
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 items-stretch">
          <div className="col-span-2">
            <div className="bg-white px-4 pt-4 rounded-lg">
              <div className="flex justify-between">
                {" "}
                <h2 className="font-semibold text-lg text-black leading-[100%] mb-4">
                  Weekly Analysis
                </h2>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex gap-4 font-semibold text-sm text-black leading-[100%]">
                    <span className="flex items-center gap-1">
                      <span className="inline-block w-3.5 h-3.5 bg-[#045CCF] rounded-full"></span>{" "}
                      NTC
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="inline-block w-3.5 h-3.5 bg-[#8CBEFF] rounded-full"></span>{" "}
                      NCell
                    </span>
                  </div>
                </div>
              </div>
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="ntc"
                      stackId="a"
                      fill="#045CCF"
                      radius={[0, 0, 0, 0]}
                    />
                    <Bar
                      dataKey="ncell"
                      stackId="a"
                      fill="#8CBEFF"
                      radius={[50, 50, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-white p-5 rounded-xl shadow-sm h-full flex flex-col justify-between">
              <h3 className="font-medium text-lg text-black mb-2 leading-[100%] flex gap-2 justify-between items-center">
                Sender IDs
                <div className="border border-black p-0.5 rounded-full">
                  <ArrowUpRight color="#000" strokeWidth={1.5} size={20} />
                </div>
              </h3>
              <div className="grid grid-cols-2 justify-center items-center">
                <div className=" flex flex-col justify-center items-center relative">
                  <div className="absolute w-[2px] bg-black h-[50px] -right-1 top-0"></div>
                  <p className="font-bold text-[50px] text-black mb-2 leading-[100%]">
                    1
                  </p>{" "}
                  <p className="font-medium text-sm leading-[100%] text-[#4A98FF]">
                    Shared
                  </p>
                </div>
                <div className=" flex flex-col justify-center items-center">
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
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-lg sm:col-span-2">
            <div className="flex justify-between items-center mb-4">
              {" "}
              <h2 className="font-semibold text-lg text-black leading-[100%]">
                Users Overview
              </h2>{" "}
              <button className="font-bold text-sm text-[#4A99FF] border border-[#4A99FF] px-5 py-1 rounded-full  hover:scale-[1.03] transition-all duration-300 cursor-pointer">
                + Add member
              </button>
            </div>
            <ul className="space-y-3 flex flex-col justify-center">
              {users.map((user, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-b from-[#4A98FF] to-[#2375E0] rounded-full flex items-center justify-center font-semibold text-white">
                    {user.name[0]}
                  </div>
                  <div>
                    <p className="font-medium text-base leading-[100%] text-[#3283EC]">
                      {user.name}
                    </p>
                    <p className="font-light text-xs leading-[100%] text-black/50 mt-1">
                      {user.email}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm w-[250px]">
            <h2 className="font-semibold text-gray-800 mb-3">
              Current Tier: <span className="text-gray-700">Silver</span>
            </h2>

            <div className="relative flex items-center justify-center max-h-[120px] overflow-hidden">
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
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <div className="text-[#4A99FF]">
              <UserRound fill="#4A99FF" />
            </div>
            <h2 className="font-medium text-2xl leading-[100%] text-black">
              Disclosure
            </h2>
          </div>

          <div className="bg-[#ECF4FF] p-3 rounded-lg mb-6">
            <p className="font-light text-[15px] leading-[100%] text-[#000000] mb-1">
              Current rate:
            </p>
            <span className="font-semibold">Rs. 0.9</span>{" "}
            <span className="font-light text-[15px] leading-[100%] text-[#000000]">
              per SMS
            </span>
          </div>

          <div>
            <p className="font-bold text-xl leading-[100%] text-black my-6">
              KYC Registered Under
            </p>

            <div className="space-y-6">
              <div>
                <p className="font-light text-[15px] leading-[100%] text-[#000000]">
                  Name
                </p>
                <p className="font-medium text-base leading-[100%] text-black mt-2">
                  Jayesh Muthmare
                </p>
              </div>

              <div>
                <p className="font-light text-[15px] leading-[100%] text-[#000000]">
                  Citizenship / Company Registration ID:
                </p>
                <p className="font-medium text-base leading-[100%] text-black mt-2">
                  09-898090-912312-99
                </p>
              </div>

              <div>
                <p className="font-light text-[15px] leading-[100%] text-[#000000]">
                  Account Manager:
                </p>
                <p className="font-medium text-base leading-[100%] text-black mt-2">
                  Gayesh Rawal
                </p>
              </div>

              <div>
                <p className="font-light text-[15px] leading-[100%] text-[#000000]">
                  Account Manager’s Contact:
                </p>
                <p className="font-medium text-base leading-[100%] text-black mt-2">
                  9832781920
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1A72E4] to-[#004BAC] text-center text-white rounded-lg p-7 relative overflow-hidden">
          <div className="absolute -right-4 bottom-0 ">
            <Image
              src={"/images/home/buttom.png"}
              width={95}
              height={153}
              alt="buttom"
            />
          </div>
          <p className="font-bold text-lg leading-[100%] text-white">
            Promo Code
          </p>
          <p className="font-[900] text-4xl leading-[100%] text-white my-3">
            17% OFF
          </p>
          <p className="font-medium text-xs leading-[130%] text-white max-w-[200px] mx-auto">
            Unlock exclusive savings with our special promo code! Don’t miss out
            on this limited-time offer!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Body;
