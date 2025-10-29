"use client";

import React, { useState } from "react";
import { Search, Edit, Trash2, PlusCircle, CheckCircle } from "lucide-react";

export default function ContactList() {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      sn: "01",
      name: "Jayesh Rawal",
      contact: "9767459069",
      date: "14/05/2025",
    },
    {
      id: 2,
      sn: "02",
      name: "Jayesh Rawal",
      contact: "9767459069",
      date: "14/05/2025",
    },
    {
      id: 3,
      sn: "03",
      name: "Jayesh Rawal",
      contact: "9767459069",
      date: "14/05/2025",
    },
    {
      id: 4,
      sn: "04",
      name: "Jayesh Rawal",
      contact: "9767459069",
      date: "14/05/2025",
    },
    {
      id: 5,
      sn: "05",
      name: "Jayesh Rawal",
      contact: "9767459069",
      date: "14/05/2025",
    },
    {
      id: 6,
      sn: "06",
      name: "Jayesh Rawal",
      contact: "9767459069",
      date: "14/05/2025",
    },
    {
      id: 7,
      sn: "07",
      name: "Jayesh Rawal",
      contact: "9767459069",
      date: "14/05/2025",
    },
  ]);

  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const handleDelete = (id) => {
    setContacts(contacts.filter((item) => item.id !== id));
  };

  const handleEdit = (id) => {
    const name = prompt("Enter new name:");
    const contact = prompt("Enter new contact number:");
    if (name && contact) {
      setContacts(
        contacts.map((item) =>
          item.id === id ? { ...item, name, contact } : item
        )
      );
    }
  };

  const handleAdd = () => {
    const name = prompt("Enter contact name:");
    const contact = prompt("Enter contact number:");
    if (name && contact) {
      const newId = contacts.length + 1;
      setContacts([
        ...contacts,
        {
          id: newId,
          sn: newId.toString().padStart(2, "0"),
          name,
          contact,
          date: new Date().toLocaleDateString("en-GB"),
        },
      ]);
    }
  };

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="rounded-2xl p-6 text-[#595959]  bg-[#F6F6F6]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-[20px]">Individual Contacts</h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-full pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3283EC]"
            />
          </div>

          <button
            className="border border-[#F10000] text-[#F10000] rounded-full px-4 py-2 flex items-center gap-2 hover:bg-[#FDECEC] transition"
            onClick={() => selected && handleDelete(selected)}
          >
            <Trash2 size={18} /> Delete
          </button>
          <button
            onClick={handleAdd}
            className="border border-[#3283EC] text-[#3283EC] rounded-full px-4 py-2 flex items-center gap-2 hover:bg-[#EAF3FF] transition"
          >
            <PlusCircle size={18} /> Add Contact
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl">
        <table className="w-full">
          <thead className="">
            <tr className="bg-gradient-to-b from-[#4A98FF] to-[#2779E3] text-white text-left text-base rounded-tr-full">
              <th className="py-3 px-4 rounded-l-full">S.N</th>
              <th className="py-3 px-4">Contact Name</th>
              <th className="py-3 px-4">Contact No.</th>
              <th className="py-3 px-4">Created In</th>
              <th className="py-3 px-4 rounded-r-full">Action</th>
            </tr>
          </thead>

          <tbody className=" text-[16px] rounded-3xl">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((item) => (
                <tr
                  key={item.id}
                  className={`border-b border-gray-200 hover:bg-[#EAF3FF] transition rounded-2xl ${
                    selected === item.id ? "bg-[#EAF3FF]" : ""
                  }`}
                >
                  <td className="py-3 px-4">
                    <input
                      type="radio"
                      name="select"
                      checked={selected === item.id}
                      onChange={() => setSelected(item.id)}
                      className="accent-[#3283EC]"
                    />{" "}
                    <span className="ml-2">{item.sn}</span>
                  </td>
                  <td className="py-3 px-4">{item.name}</td>
                  <td className="py-3 px-4">{item.contact}</td>
                  <td className="py-3 px-4">{item.date}</td>
                  <td className="py-3 px-4 flex items-center gap-3">
                    <CheckCircle
                      size={18}
                      className="text-green-600 cursor-pointer hover:scale-110 transition"
                    />
                    <Edit
                      size={18}
                      onClick={() => handleEdit(item.id)}
                      className="text-[#E5C100] cursor-pointer hover:scale-110 transition"
                    />
                    <Trash2
                      size={18}
                      onClick={() => handleDelete(item.id)}
                      className="text-[#F10000] cursor-pointer hover:scale-110 transition"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-500 text-base"
                >
                  No contacts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Footer */}
        <div className="flex justify-between text-sm text-gray-500 px-4 py-2">
          <span>
            Showing 1 to {filteredContacts.length} of {contacts.length} entries
          </span>
          <div className="flex gap-2">
            <button className="px-2">&lt;</button>
            <button className="px-2">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}
