"use client";
import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
} from "lucide-react";

export default function SenderIDDashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const senderData = [
    {
      id: 1,
      status: "Active",
      senderId: "Jayesh Rawal Muthnare",
      price: "Rs. 1000 month",
      type: "Shared",
    },
    {
      id: 2,
      status: "Pending",
      senderId: "Jayesh Rawal Muthnare",
      price: "Rs. 1000 month",
      type: "Dedicated",
    },
    {
      id: 3,
      status: "Expired",
      senderId: "Jayesh Rawal Muthnare",
      price: "Rs. 1000 month",
      type: "Dedicated",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Expired":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto h-fit">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Sender ID</h1>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <span className="text-xl">+</span>
            <span>Request New ID</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search sender id"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 ml-4">
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filter</span>
            </button>
          </div>

          <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-gray-50 text-sm font-medium text-gray-600">
            <div className="col-span-2">Status</div>
            <div className="col-span-4">Sender ID</div>
            <div className="col-span-3">Price</div>
            <div className="col-span-2">Type</div>
            <div className="col-span-1"></div>
          </div>

          <div className="divide-y divide-gray-100">
            {senderData.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-12 gap-4 px-4 py-4 items-center hover:bg-gray-50 transition-colors"
              >
                <div className="col-span-2">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </div>
                <div className="col-span-4 text-gray-800">{item.senderId}</div>
                <div className="col-span-3 text-gray-600">{item.price}</div>
                <div className="col-span-2 text-gray-600">{item.type}</div>
                <div className="col-span-1 flex justify-end">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end gap-4 px-4 py-4 border-t border-gray-200">
            <span className="text-sm text-gray-600">
              Showing 1 to 1 of 0 entries
            </span>
            <div className="flex items-center gap-2">
              <button
                className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                disabled
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                disabled
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
