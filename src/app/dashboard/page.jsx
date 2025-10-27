"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Card from "@/components/reusable/Card";
export default function Dashboard() {

  const data = [
    { name: "S", ntc: 40, ncell: 60 },
    { name: "M", ntc: 70, ncell: 90 },
    { name: "T", ntc: 80, ncell: 100 },
    { name: "W", ntc: 90, ncell: 120 },
    { name: "T", ntc: 60, ncell: 80 },
    { name: "F", ntc: 50, ncell: 70 },
    { name: "S", ntc: 30, ncell: 40 },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-2 space-y-6">
        <div className="grid sm:grid-cols-3 gap-6">
          <Card>
            <h3 className="font-semibold text-gray-800 mb-2">
              Current Balance
            </h3>
            <p className="text-4xl font-bold text-blue-600">20,000</p>
            <p className="text-sm text-gray-500 mt-1">
              ↑ Increase from last month
            </p>
          </Card>
          <Card>
            <h3 className="font-semibold text-gray-800 mb-2">Contacts</h3>
            <div className="flex items-baseline gap-2">
              <p className="text-4xl font-bold">720</p>
              <p className="text-lg text-gray-500">| 120 Group</p>
            </div>
          </Card>
          <Card>
            <h3 className="font-semibold text-gray-800 mb-2">
              SMS Sent This Month
            </h3>
            <p className="text-4xl font-bold">220</p>
            <p className="text-sm text-gray-500 mt-1">
              ↑ Increase from last month
            </p>
          </Card>
        </div>
        <Card title="Weekly Analysis">
          <div className="flex items-center justify-between mb-2">
            <div className="flex gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <span className="inline-block w-3 h-3 bg-blue-500 rounded-full"></span>{" "}
                NTC
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-3 h-3 bg-sky-300 rounded-full"></span>{" "}
                NCell
              </span>
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
                  fill="#3b82f6"
                  radius={[6, 6, 0, 0]}
                />
                <Bar
                  dataKey="ncell"
                  stackId="a"
                  fill="#93c5fd"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <div className="grid sm:grid-cols-2 gap-6">
          <Card title="Users Overview">
            <ul className="space-y-3">
              {[
                {
                  name: "Jayesh Nath Rawal Muthmare",
                  email: "muthmarejayesh@gmail.com",
                },
                { name: "Kushal Kafle", email: "kushalkafle@gmail.com" },
                {
                  name: "Jayesh Nath Rawal Muthmare",
                  email: "muthmarejayesh@gmail.com",
                },
              ].map((user, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-semibold text-blue-600">
                    {user.name[0]}
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </li>
              ))}
            </ul>
            <button className="mt-4 px-3 py-1 border rounded-lg text-blue-600 border-blue-600 hover:bg-blue-50 text-sm">
              + Add Member
            </button>
          </Card>

          <Card title="Current Tier: Silver">
            <div className="relative flex items-center justify-center h-32">
              <div className="absolute w-28 h-28 border-8 border-gray-200 rounded-full"></div>
              <div className="absolute w-28 h-28 border-8 border-blue-500 rounded-full border-t-transparent rotate-45"></div>
              <div className="text-center">
                <p className="text-3xl font-semibold text-blue-600">41%</p>
                <p className="text-sm text-gray-500 mt-1">Till next tier</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 text-center">
              29,999 remaining for{" "}
              <span className="text-blue-600 font-medium">Gold Tier</span>
            </p>
          </Card>
        </div>
      </div>

      <div className="space-y-6">
        <Card title="Disclosure">
          <p className="text-sm mb-2">
            Current rate: <b>Rs. 0.9</b> per SMS
          </p>
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-1">KYC Registered Under</p>
            <p className="font-medium">Jayesh Muthmare</p>
            <p className="text-sm text-gray-500">
              Citizenship ID: 09-898090-912312-99
            </p>
            <p className="text-sm text-gray-500">
              Account Manager: Gayesh Rawal
            </p>
            <p className="text-sm text-gray-500">Contact: 9832781920</p>
          </div>
        </Card>
        <Card>
          <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-xl p-5 text-center">
            <p className="text-lg font-semibold">Promo Code</p>
            <p className="text-3xl font-bold mt-2">17% OFF</p>
            <p className="text-sm mt-2">
              Unlock exclusive savings! Don’t miss out on this limited-time
              offer.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
