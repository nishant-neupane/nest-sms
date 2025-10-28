"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { getTransactions } from "@/services/api";

export default function TransactionReport() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await getTransactions(10, 0);

      const formatted = result.transactions.map((t, index) => ({
        sn: String(index + 1).padStart(2, "0"),
        user: t.created_by || "N/A",
        particular:
          t.reference_type === "sms"
            ? "SMS"
            : t.reference_type === "manual"
            ? "Balance Load"
            : "Other",
        dr: t.type === "debit" ? `-${t.amount}` : "-",
        cr: t.type === "credit" ? `+${t.amount}` : "-",
        balance: t.balance_after,
        date: new Date(t.created_at).toLocaleString(),
        remarks: t.description || "-",
      }));

      setData(formatted);
      setTotal(result.total);
    };

    fetchData();
  }, []);

  const filtered = data.filter((item) =>
    item.user.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-6 bg-[#F6F6F6]">
      <div className="flex justify-between items-center">
        <div className="text-[#595959] font-bold text-[20px] sm:text-[24px] mb-5">
          Transaction Report
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center w-full sm:w-[280px] bg-white px-4 py-2 rounded-full shadow-sm focus-within:ring-2 mt-1">
            <Search className="text-[#BABABA]" size={18} />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 outline-none px-2 text-sm text-[#595959]"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <button className="font-medium text-sm sm:text-[16px] text-[#3283EC] border border-[#3283EC] rounded-full px-5 py-2 hover:bg-blue-50 transition">
            + Load Balance
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl shadow-sm">
        <table className="w-full text-left divide-y divide-[#EBEBEB]">
          <thead>
            <tr className="bg-gradient-to-b from-[#4A98FF] to-[#2779E3] text-white text-[16px]">
              <th className="py-3 px-4 rounded-l-full">S.N</th>
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Particular</th>
              <th className="py-3 px-4">Dr</th>
              <th className="py-3 px-4">Cr</th>
              <th className="py-3 px-4">Balance</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4 rounded-r-full">Remarks</th>
            </tr>
          </thead>

          <tbody className="text-[16px] text-[#595959] divide-y divide-[#EBEBEB]">
            {filtered.map((row, index) => (
              <tr key={index} className="hover:bg-[#EAF3FF] transition">
                <td className="py-3 px-4">{row.sn}</td>
                <td className="py-3 px-4">{row.user}</td>
                <td className="py-3 px-4">{row.particular}</td>
                <td
                  className="py-3 px-4"
                  style={{ color: row.dr !== "-" ? "#F10000" : "#595959" }}
                >
                  {row.dr}
                </td>
                <td
                  className="py-3 px-4"
                  style={{ color: row.cr !== "-" ? "#008000" : "#595959" }}
                >
                  {row.cr}
                </td>
                <td className="py-3 px-4">{row.balance}</td>
                <td className="py-3 px-4 whitespace-nowrap">{row.date}</td>
                <td className="py-3 px-4">{row.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-sm text-right text-[#595959] mt-3">
        Showing 1 to {filtered.length} of {total} entries
      </div>
    </div>
  );
}
