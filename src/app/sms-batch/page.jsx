"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  X,
  Search,
  ShoppingCart,
  LucideTrash,
  ChevronDown,
  ChevronsDown,
} from "lucide-react";

export default function Page() {
  const [data, setData] = useState([
    {
      id: 1,
      sn: "01",
      sender: "Jayesh Rawal",
      price: 20,
      status: "Expired",
      color: "#F10000",
      date: "2025-10-20",
    },
    {
      id: 2,
      sn: "02",
      sender: "Aarav Sharma",
      price: 20,
      status: "Pending",
      color: "#E5C100",
      date: "2025-10-25",
    },
    {
      id: 3,
      sn: "03",
      sender: "Sneha Joshi",
      price: 30,
      status: "Active",
      color: "#008000",
      date: "2025-10-27",
    },
    {
      id: 4,
      sn: "04",
      sender: "laxmipandey",
      price: 30,
      status: "Pending",
      color: "#E5C100",
      date: "2025-10-27",
    },
    {
      id: 5,
      sn: "05",
      sender: "Suraj pandit",
      price: 30,
      status: "Expired",
      color: "#F10000",
      date: "2025-10-27",
    },
    {
      id: 6,
      sn: "06",
      sender: "biplov karki",
      price: 30,
      status: "Active",
      color: "#008000",
      date: "2025-10-27",
    },
    {
      id: 7,
      sn: "07",
      sender: "nishant neupane",
      price: 30,
      status: "Pending",
      color: "#E5C100",
      date: "2025-10-27",
    },
    {
      id: 8,
      sn: "08",
      sender: "Aayush raj shrestha",
      price: 30,
      status: "Expired",
      color: "#F10000",
      date: "2025-10-27",
    },
    {
      id: 9,
      sn: "09",
      sender: "sonam lama",
      price: 30,
      status: "Pending",
      color: "#E5C100",
      date: "2025-10-27",
    },
    {
      id: 10,
      sn: "10",
      sender: "paul shah",
      price: 30,
      status: "Expired",
      color: "#F10000",
      date: "2025-10-27",
    },
  ]);

  const [query, setQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);
  const [showPopup, setShowPopup] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  // Calendar states
  const [activeCalendar, setActiveCalendar] = useState(null);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [days, setDays] = useState([]);

  // Update days whenever month/year changes
  useEffect(() => {
    const getDaysInMonth = (y, m) => {
      const date = new Date(y, m, 1);
      const daysArray = [];
      while (date.getMonth() === m) {
        daysArray.push(date.getDate());
        date.setDate(date.getDate() + 1);
      }
      return daysArray;
    };
    setDays(getDaysInMonth(year, month));
  }, [month, year]);

  const monthName = new Date(year, month).toLocaleString("default", {
    month: "long",
  });

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const changeYear = (e) => {
    setYear(parseInt(e.target.value));
  };

  const formatDate = (y, m, d) => {
    const mm = (m + 1).toString().padStart(2, "0");
    const dd = d.toString().padStart(2, "0");
    return `${y}-${mm}-${dd}`;
  };

  const selectDay = (day) => {
    const formatted = formatDate(year, month, day);
    if (activeCalendar === "start") {
      setTempStartDate(formatted);
    } else {
      setTempEndDate(formatted);
    }
  };

  const filteredData = data.filter((item) => {
    const matchesName = item.sender.toLowerCase().includes(query.toLowerCase());
    const matchesDate =
      (startDate ? item.date >= startDate : true) &&
      (endDate ? item.date <= endDate : true);
    return matchesName && matchesDate;
  });

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between px-5 relative">
        <div className="text-[#595959] font-bold text-[24px]">Sender ID</div>
        <div className="flex gap-4">
          {/* Search */}
          <div className="flex items-center rounded-full px-4 py-2 w-[280px] bg-white mt-5 shadow-sm focus-within:ring-2">
            <Search className="text-[#BABABA]" />
            <input
              type="text"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 outline-none text-[#BABABA] placeholder-gray-400 bg-transparent px-2"
            />
          </div>

          {/* Request New ID */}
          <button className="font-medium text-[18px] text-[#3283EC] mt-5 border border-[#3283EC] rounded-full px-5 py-2">
            + Request New ID
          </button>

          {/* Date Picker */}
          <div className="relative mt-5">
            <button
              onClick={() => {
                setShowPopup(!showPopup);
                setTempStartDate(startDate);
                setTempEndDate(endDate);
              }}
              className="flex items-center border border-[#3283EC] rounded-full font-medium px-4 py-2 text-[#3283EC] cursor-pointer hover:bg-blue-50 transition"
            >
              <Calendar size={16} className="mr-2" />
              {startDate && endDate ? `${startDate} → ${endDate}` : "Date"}
            </button>

            {showPopup && (
              <div className="absolute right-0 mt-2 w-[320px] bg-white shadow-lg rounded-xl p-4 border border-gray-200 z-10">
                {/* Header */}
                <div className="flex justify-center items-center mb-3">
                  <div className="text-[#3283EC] font-bold">Select Dates</div>
                </div>

                {/* Start / End Inputs */}
                <div className="flex gap-3 mb-3 text-[#3283EC] font-medium">
                  <div className="flex-1 relative">
                    <label className="text-[14px] text-[#626262] mb-1 block">
                      Starting date
                    </label>
                    <input
                      type="text"
                      value={tempStartDate || ""}
                      readOnly
                      onClick={() => setActiveCalendar("start")}
                      className="w-full px-3 py-2 bg-[#D0E4FF]  cursor-pointer text-sm"
                      placeholder="mm/dd/yyyy"
                    />
                  </div>

                  <div className="flex-1 relative">
                    <label className="text-[14px] text-[#626262] mb-1 block">
                      Ending date
                    </label>
                    <input
                      type="text"
                      value={tempEndDate || ""}
                      readOnly
                      onClick={() => setActiveCalendar("end")}
                      className="w-full px-3 py-2 bg-[#D0E4FF]  cursor-pointer text-sm"
                      placeholder="mm/dd/yyyy"
                    />
                  </div>
                </div>

                {/* Calendar */}
                {activeCalendar && (
                  <div className="rounded-lg p-2 bg-white text-[#3283EC] shadow-md mb-3">
                    <div className="flex justify-between mb-2 items-center">
                      <div className="font-medium flex items-center gap-2">
                        <span>{monthName}</span>

                        {/* Custom Year Dropdown */}
                        <div className="relative flex flex-col">
                          <button
                            type="button"
                            onClick={() => setShowYearDropdown((prev) => !prev)}
                            className="rounded px-2 py-1 text-sm text-[#3283EC] bg-white focus:outline-none"
                          >
                            {year}
                            <div>
                              <ChevronDown />
                            </div>
                          </button>

                          {showYearDropdown && (
                            <ul
                              className="absolute z-10 mt-1 max-h-48 overflow-y-auto w-12 bg-white rounded shadow-lg"
                              style={{ scrollbarWidth: "none" }}
                            >
                              {Array.from(
                                { length: 11 },
                                (_, i) => year - 5 + i
                              ).map((y) => (
                                <li
                                  key={y}
                                  onClick={() => {
                                    changeYear({ target: { value: y } });
                                    setShowYearDropdown(false);
                                  }}
                                  className="px-2 py-1 text-sm text-[#3283EC] hover:bg-[#E6F0FF] cursor-pointer select-none"
                                >
                                  {y}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-4 text-2xl">
                        <button
                          onClick={prevMonth}
                          className="px-3 py-1 font-bold hover:text-blue-500"
                        >
                          &lt;
                        </button>
                        <button
                          onClick={nextMonth}
                          className="px-3 py-1 font-bold hover:text-blue-500"
                        >
                          &gt;
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 text-center text-xs font-medium mb-1 text-[#3C3C434D]">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                        (d) => (
                          <div key={d}>{d}</div>
                        )
                      )}
                    </div>

                    <div className="grid grid-cols-7 text-center text-[#3283EC]">
                      {days.map((day, idx) => {
                        const isSelected =
                          (activeCalendar === "start"
                            ? tempStartDate
                            : tempEndDate) === formatDate(year, month, day);
                        return (
                          <button
                            key={idx}
                            onClick={() => selectDay(day)}
                            className={`p-1 m-0.5 rounded-full ${
                              isSelected
                                ? "bg-[#3283EC] text-white"
                                : "hover:bg-blue-100"
                            }`}
                          >
                            {day || ""}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex justify-end mt-3 gap-3">
                  <button
                    onClick={() => {
                      setShowPopup(false);
                      setTempStartDate(startDate);
                      setTempEndDate(endDate);
                    }}
                    className="border border-[#F10000] text-[#F10000] px-4 py-2 rounded-full hover:bg-[#F10000]/20 transition"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => {
                      setStartDate(tempStartDate);
                      setEndDate(tempEndDate);
                      setShowPopup(false);
                    }}
                    className="bg-[#3283EC] text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
                  >
                    OK
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-4xl px-4 mt-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-b from-[#4A98FF] to-[#2779E3] text-[#FFFFFF]">
              <th className="py-3 px-4 text-left rounded-tl-2xl">S.N</th>
              <th className="py-3 px-4 text-left">Sender ID</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left rounded-tr-2xl">Action</th>
            </tr>
          </thead>

          <tbody className="text-[#595959] text-[18px] bg-[#F6F6F6]">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-[#EBEBEB] hover:bg-[#EAF3FF] transition"
                >
                  <td className="py-3 px-4">{item.sn}</td>
                  <td className="py-3 px-4">{item.sender}</td>
                  <td className="py-3 px-4">
                    <div>Rs. {item.price}</div>
                    <div className="text-[14px] text-[#595959]">Month</div>
                  </td>
                  <td className="py-3 px-4" style={{ color: item.color }}>
                    {item.status}
                  </td>
                  <td className="py-3 px-4 flex items-center gap-3">
                    <span className="text-[#3283EC] cursor-pointer">
                      <ShoppingCart />
                    </span>
                    <span
                      className="text-[#F10000] cursor-pointer"
                      onClick={() => handleDelete(item.id)}
                    >
                      <LucideTrash />
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-6 text-center text-gray-500">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
