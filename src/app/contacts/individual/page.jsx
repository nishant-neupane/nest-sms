"use client";

import { CheckCircle, Edit, PlusCircle, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import { contacts as fetchContacts } from "@/services/api"; 

export default function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage] = useState(7);

  useEffect(() => {
    const loadContacts = async () => {
      setLoading(true);
      try {
        const result = await fetchContacts();
        console.log("Fetched contacts data:", result);

        if (result?.data?.contacts) {
          setContacts(result.data.contacts);
        } else {
          console.error("Unexpected data format:", result);
          setContacts([]);
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setContacts([]);
      } finally {
        setLoading(false);
      }
    };

    loadContacts();
  }, []);

  // Delete contact
  const handleDelete = (id) => {
    setContacts((prev) => prev.filter((item) => item.id !== id));
    // Reset to first page if current page becomes empty
    if (currentPage > 1 && filteredContacts.length === 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Edit contact
  const handleEdit = (id) => {
    const name = prompt("Enter new name:");
    const contact = prompt("Enter new contact number:");
    if (name && contact) {
      setContacts((prev) =>
        prev.map((item) => (item.id === id ? { ...item, name, contact } : item))
      );
    }
  };

  // Add contact
  const handleAdd = () => {
    const name = prompt("Enter contact name:");
    const contact = prompt("Enter contact number:");
    if (name && contact) {
      const newId =
        contacts.length > 0 ? Math.max(...contacts.map((c) => c.id)) + 1 : 1;
      const newContact = {
        id: newId,
        sn: newId.toString().padStart(2, "0"),
        name,
        contact,
        date: new Date().toLocaleDateString("en-GB"),
      };
      setContacts([...contacts, newContact]);
      // Go to last page where the new contact will be shown
      const totalFilteredPages = Math.ceil(
        filteredContacts.length / contactsPerPage
      );
      setCurrentPage(totalFilteredPages + 1);
    }
  };

  // Filtered contacts based on search
  const filteredContacts = contacts.filter((c) =>
    c.name?.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = filteredContacts.slice(
    indexOfFirstContact,
    indexOfLastContact
  );
  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Go to next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Go to previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <div className="rounded-2xl p-6 text-[#595959] bg-[#F6F6F6]">
      {/* Header */}
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
            onClick={handleAdd}
            className="border border-[#3283EC] text-[#3283EC] rounded-full px-4 py-2 flex items-center gap-2 hover:bg-[#EAF3FF] transition"
          >
            <PlusCircle size={18} /> Add Contact
          </button>

          <button
            className="border border-[#F10000] text-[#F10000] rounded-full px-4 py-2 flex items-center gap-2 hover:bg-[#FDECEC] transition"
            onClick={() => selected && handleDelete(selected)}
          >
            <Trash2 size={18} /> Delete
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-b from-[#4A98FF] to-[#2779E3] text-white text-left text-base rounded-tr-full">
              <th className="py-3 px-4 rounded-l-full">S.N</th>
              <th className="py-3 px-4">Contact Name</th>
              <th className="py-3 px-4">Contact No.</th>
              <th className="py-3 px-4">Created In</th>
              <th className="py-3 px-4 rounded-r-full">Action</th>
            </tr>
          </thead>

          <tbody className="text-[16px] rounded-3xl">
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  Loading contacts...
                </td>
              </tr>
            ) : currentContacts.length > 0 ? (
              currentContacts.map((item, index) => {
                const globalIndex = indexOfFirstContact + index;
                return (
                  <tr
                    key={item.id || globalIndex}
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
                      <span className="ml-2">
                        {item.sn ||
                          (globalIndex + 1).toString().padStart(2, "0")}
                      </span>
                    </td>
                    <td className="py-3 px-4">{item.name}</td>
                    <td className="py-3 px-4">{item.phone}</td>
                    <td className="py-3 px-4">
                      {item.date || new Date().toLocaleDateString("en-GB")}
                    </td>
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
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-500 text-base"
                >
                  {contacts.length === 0
                    ? "No contacts available."
                    : "No contacts found matching your search."}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Footer */}
        {!loading && filteredContacts.length > 0 && (
          <div className="flex justify-between items-center text-sm text-gray-500 px-4 py-3 bg-white border-t">
            <span>
              Showing {indexOfFirstContact + 1} to{" "}
              {Math.min(indexOfLastContact, filteredContacts.length)} of{" "}
              {filteredContacts.length} entries
            </span>
            <div className="flex gap-2 items-center">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                &lt; Previous
              </button>

              {/* Page Numbers */}
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`px-3 py-1 rounded ${
                        currentPage === number
                          ? "bg-[#3283EC] text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {number}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Next &gt;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
