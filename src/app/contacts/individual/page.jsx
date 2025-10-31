"use client";

import { CheckCircle, Edit, PlusCircle, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import {
  createContact,
  deleteContact,
  contacts as fetchContacts,
  updateContact,
  fetchGroup,
  addContactsToGroup,
} from "@/services/api";
import { Modal } from "@/components/reusable/Modal";

export default function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage] = useState(15);
  const [dataNotFound, setDataNotFound] = useState(false);
  const [apiError, setApiError] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [contactToDeleteId, setContactToDeleteId] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [contactToEdit, setContactToEdit] = useState({
    id: null,
    name: "",
    phone: "",
    groupIds: [],
  });

  const [groups, setGroups] = useState([]);

  const loadContacts = async () => {
    setLoading(true);
    setDataNotFound(false);
    setApiError(null);
    try {
      const result = await fetchContacts();
      if (result?.data?.contacts?.length > 0) {
        setContacts(result.data.contacts);
        setDataNotFound(false);
      } else {
        setContacts([]);
        setDataNotFound(true);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setContacts([]);
      setDataNotFound(true);
      setApiError("Failed to load contacts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchGroupsData = async () => {
      try {
        const response = await fetchGroup();
        const data = await response.json();
        setGroups(data.groups || []);
      } catch (err) {
        console.error("Error fetching groups:", err);
      }
    };
    fetchGroupsData();
  }, []);

  useEffect(() => {
    loadContacts();
  }, []);

  const confirmDelete = (id) => {
    setContactToDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDeleteConfirmed = async () => {
    const id = contactToDeleteId;
    setShowDeleteModal(false);
    setContactToDeleteId(null);
    if (!id) return;

    try {
      setLoading(true);
      const response = await deleteContact(id);
      if (response?.success || response?.data || response?.message) {
        setContacts((prev) => {
          const updated = prev.filter((item) => item.id !== id);
          if (
            currentPage > 1 &&
            updated.length <= (currentPage - 1) * contactsPerPage
          ) {
            setCurrentPage(currentPage - 1);
          }
          return updated;
        });
        setApiError(null);
      } else {
        setApiError("Failed to delete contact");
      }
    } catch (err) {
      console.error("Error deleting contact:", err);
      setApiError("Failed to delete contact. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (contact) => {
    setContactToEdit({
      id: contact.id,
      name: contact.name,
      phone: contact.phone,
      groupIds: contact.groupIds || [],
    });
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const { id, name, phone, groupIds } = contactToEdit;

      const response = await updateContact(id, { name, phone });

      if (response?.success || response?.data || response?.message) {
        if (groups.length > 0) {
          try {
            const currentContact = contacts.find((c) => c.id === id);
            const currentGroupIds = currentContact?.groupIds || [];

            const groupsToAdd = groupIds.filter(
              (groupId) => !currentGroupIds.includes(groupId)
            );

            if (groupsToAdd.length > 0) {
              const addPromises = groupsToAdd.map((groupId) =>
                addContactsToGroup(groupId, [id])
              );
              await Promise.all(addPromises);
            }
          } catch (groupError) {
            console.error("Error managing group assignments:", groupError);
            alert(
              "Contact updated but there was an issue with group assignments. Please check the groups."
            );
          }
        }

        setShowEditModal(false);
        await loadContacts();
        setContactToEdit({ id: null, name: "", phone: "", groupIds: [] });
        setApiError(null);
      } else {
        setApiError("Failed to update contact");
      }
    } catch (err) {
      console.error("Error updating contact:", err);
      setApiError("Failed to update contact. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    const name = prompt("Enter contact name:");
    const phone = prompt("Enter contact number:");
    if (name && phone) {
      try {
        setLoading(true);
        const newContact = { name, phone, groupIds: [] };
        const response = await createContact(newContact);
        if (response?.success || response?.data || response?.message) {
          setContacts((prev) => [...prev, response.data || newContact]);
          setDataNotFound(false);
          setApiError(null);
        } else {
          setApiError("Failed to add contact");
        }
      } catch (err) {
        console.error("Error creating contact:", err);
        setApiError("Failed to add contact. Try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Filtering & Pagination
  const filteredContacts = contacts.filter((c) =>
    c.name?.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = filteredContacts.slice(
    indexOfFirstContact,
    indexOfLastContact
  );
  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  useEffect(() => setCurrentPage(1), [search]);

  const handleRetry = () => loadContacts();

  return (
    <div className="rounded-2xl p-6 text-[#595959] bg-[#F6F6F6] h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
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
            onClick={() => selected && confirmDelete(selected)}
          >
            <Trash2 size={18} /> Delete
          </button>
        </div>
      </div>

      {/* Contacts Table Container */}
      <div className="bg-white rounded-2xl flex-1 flex flex-col overflow-hidden">
        <div
          className="flex-1 overflow-auto"
          style={{ scrollbarWidth: "none" }}
        >
          <table className="w-full">
            <thead className="sticky top-0 z-10">
              <tr className="bg-gradient-to-b from-[#4A98FF] to-[#2779E3] text-white text-left text-base">
                <th className="py-3 px-4 rounded-l-full">S.N</th>
                <th className="py-3 px-4">Contact Name</th>
                <th className="py-3 px-4">Contact No.</th>
                <th className="py-3 px-4">Created In</th>
                <th className="py-3 px-4 rounded-r-full">Action</th>
              </tr>
            </thead>
            <tbody className="text-[16px]">
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-500">
                    Loading contacts...
                  </td>
                </tr>
              ) : apiError ? (
                <tr>
                  <td colSpan="5" className="text-center py-8">
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-red-500 font-medium text-lg mb-2">
                        {apiError}
                      </div>
                      <button
                        onClick={handleRetry}
                        className="mt-2 border border-[#3283EC] text-[#3283EC] rounded-full px-4 py-2 hover:bg-[#EAF3FF] transition"
                      >
                        Retry
                      </button>
                    </div>
                  </td>
                </tr>
              ) : dataNotFound ? (
                <tr>
                  <td colSpan="5" className="text-center py-8">
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-gray-500 font-medium text-lg mb-2">
                        No Contacts Found
                      </div>
                      <div className="text-gray-500 text-sm mb-4">
                        {contacts.length === 0
                          ? "Start by adding your first contact."
                          : "No contacts match your search criteria."}
                      </div>
                      <button
                        onClick={handleAdd}
                        className="border border-[#3283EC] text-[#3283EC] rounded-full px-4 py-2 flex items-center gap-2 hover:bg-[#EAF3FF] transition"
                      >
                        <PlusCircle size={16} /> Add Your First Contact
                      </button>
                    </div>
                  </td>
                </tr>
              ) : currentContacts.length > 0 ? (
                currentContacts.map((item, index) => {
                  const globalIndex = indexOfFirstContact + index;
                  return (
                    <tr
                      key={item.id || globalIndex}
                      className={`border-b border-gray-200 hover:bg-[#EAF3FF] transition ${
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
                        <Edit
                          size={18}
                          onClick={() => handleEdit(item)}
                          className="text-[#E5C100] cursor-pointer hover:scale-110 transition"
                        />
                        <Trash2
                          size={18}
                          onClick={() => confirmDelete(item.id)}
                          className="text-[#F10000] cursor-pointer hover:scale-110 transition"
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-500">
                    No contacts available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading &&
          !apiError &&
          !dataNotFound &&
          filteredContacts.length > 0 && (
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

      {/* Delete Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete"
      >
        <div className="flex flex-col items-center">
          <div className="p-4 mb-4 rounded-full bg-red-100">
            <Trash2 size={24} className="text-[#F10000]" />
          </div>
          <p className="text-gray-500 text-center mb-6">
            Are you sure you want to delete?
            <br />
            <strong>This action cannot be undone.</strong>
          </p>
          <div className="flex gap-4 w-full">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="flex-1 border border-gray-300 text-gray-700 rounded-full px-4 py-3 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={confirmDeleteConfirmed}
              className="flex-1 bg-[#F10000] text-white rounded-full px-4 py-3 hover:bg-red-700 transition font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Contact"
      >
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            value={contactToEdit.name}
            onChange={(e) =>
              setContactToEdit({ ...contactToEdit, name: e.target.value })
            }
            className="border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3283EC]"
          />
          <input
            type="text"
            placeholder="Phone"
            value={contactToEdit.phone}
            onChange={(e) =>
              setContactToEdit({ ...contactToEdit, phone: e.target.value })
            }
            className="border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3283EC]"
          />

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Assign Groups
            </label>
            <select
              multiple
              value={contactToEdit.groupIds}
              onChange={(e) =>
                setContactToEdit({
                  ...contactToEdit,
                  groupIds: Array.from(
                    e.target.selectedOptions,
                    (option) => option.value
                  ),
                })
              }
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3283EC]"
            >
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setShowEditModal(false)}
              className="flex-1 border border-gray-300 text-gray-700 rounded-full px-4 py-2 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="flex-1 bg-[#3283EC] text-white rounded-full px-4 py-2 hover:bg-blue-700 transition font-medium"
            >
              Update Contact
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
