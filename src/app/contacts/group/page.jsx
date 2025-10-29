"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Edit,
  Trash2,
  PlusCircle,
  CheckCircle,
  X,
  UserPlus,
  UserMinus,
} from "lucide-react";
import { fetchGroup } from "@/services/api";
import { Modal } from "@/app/dashboard/components/modals/Modal";

export default function ContactList() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [selected1, setSelected1] = useState([]);
  const [search, setSearch] = useState("");
  const [editPopup, setEditPopup] = useState(null);
  const [newMember, setNewMember] = useState("");
  const [members, setMembers] = useState([]);
  const [membersLoading, setMembersLoading] = useState(false);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setLoading(true);
        const response = await fetchGroup();

        if (!response.ok) {
          throw new Error(`Failed to fetch groups: ${response.status}`);
        }

        const data = await response.json();
        setGroups(data.groups || []);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching groups:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  useEffect(() => {
    const fetchGroupMembers = async () => {
      if (!editPopup) return;

      try {
        setMembersLoading(true);
        const response = await fetch(
          `/api/contacts/groups/${editPopup.id}/members`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch members: ${response.status}`);
        }

        const membersData = await response.json();
        setMembers(membersData.members || []);
      } catch (err) {
        console.error("Error fetching group members:", err);
        setMembers([]);
      } finally {
        setMembersLoading(false);
      }
    };

    fetchGroupMembers();
  }, [editPopup]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this group?")) return;

    try {
      const response = await fetch(`/api/contacts/groups/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete group");
      }

      setGroups(groups.filter((group) => group.id !== id));
      if (selected === id) setSelected(null);
    } catch (err) {
      alert("Error deleting group: " + err.message);
      console.error("Error deleting group:", err);
    }
  };

  const handleEdit = (id) => {
    const group = groups.find((g) => g.id === id);
    setEditPopup(group);
    setNewMember("");
  };

  const handleSaveEdit = async () => {
    if (!editPopup) return;

    try {
      const response = await fetch(`/api/contacts/groups/${editPopup.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editPopup.name,
          description: editPopup.description,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update group");
      }

      const updatedGroup = await response.json();

      setGroups(
        groups.map((group) =>
          group.id === editPopup.id ? { ...group, ...updatedGroup } : group
        )
      );
      setEditPopup(null);
    } catch (err) {
      alert("Error updating group: " + err.message);
      console.error("Error updating group:", err);
    }
  };

  const handleAddMember = async () => {
    if (!newMember.trim() || !editPopup) return;

    try {
      const response = await fetch(
        `/api/contacts/groups/${editPopup.id}/members`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newMember,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add member");
      }

      const newMemberData = await response.json();

      setMembers([...members, newMemberData]);

      setEditPopup({
        ...editPopup,
        member_count: (editPopup.member_count || 0) + 1,
      });

      setGroups(
        groups.map((group) =>
          group.id === editPopup.id
            ? { ...group, member_count: (group.member_count || 0) + 1 }
            : group
        )
      );

      setNewMember("");
    } catch (err) {
      alert("Error adding member: " + err.message);
      console.error("Error adding member:", err);
    }
  };

  const handleRemoveMember = async (memberId) => {
    if (!confirm("Are you sure you want to remove this member?")) return;

    try {
      const response = await fetch(
        `/api/contacts/groups/${editPopup.id}/members/${memberId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove member");
      }

      setMembers(members.filter((member) => member.id !== memberId));

      if (editPopup) {
        setEditPopup({
          ...editPopup,
          member_count: Math.max(0, (editPopup.member_count || 0) - 1),
        });

        setGroups(
          groups.map((group) =>
            group.id === editPopup.id
              ? {
                  ...group,
                  member_count: Math.max(0, (group.member_count || 0) - 1),
                }
              : group
          )
        );
      }
    } catch (err) {
      alert("Error removing member: " + err.message);
      console.error("Error removing member:", err);
    }
  };

  const handleAdd = async () => {
    const name = prompt("Enter group name:");
    const description = prompt("Enter group description:");

    if (name && description) {
      try {
        const response = await fetch("/api/contacts/groups", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            description,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to create group");
        }

        const newGroup = await response.json();
        setGroups([...groups, newGroup]);
      } catch (err) {
        alert("Error creating group: " + err.message);
        console.error("Error creating group:", err);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  const filteredGroups = groups.filter(
    (group) =>
      group.name.toLowerCase().includes(search.toLowerCase()) ||
      group.description.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="rounded-2xl p-6 text-[#595959] bg-[#F6F6F6]">
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3283EC]"></div>
          <span className="ml-2">Loading groups...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl p-6 text-[#595959] bg-[#F6F6F6]">
        <div className="text-center py-8 text-red-500">
          <p>Error loading groups: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-[#3283EC] text-white rounded-full hover:bg-[#2779E3] transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl p-6 text-[#595959] bg-[#F6F6F6]">
      <Modal
        isOpen={!!editPopup}
        onClose={() => setEditPopup(null)}
        title={
          editPopup?.name ? `Edit Group - ${editPopup.name}` : "Edit Group"
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Group Name
            </label>
            <input
              type="text"
              value={editPopup?.name || ""}
              onChange={(e) =>
                setEditPopup({ ...editPopup, name: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3283EC]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={editPopup?.description || ""}
              onChange={(e) =>
                setEditPopup({ ...editPopup, description: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3283EC]"
              rows="3"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Group Members ({members.length})
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add new member..."
                  value={newMember}
                  onChange={(e) => setNewMember(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddMember()}
                  className="border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#3283EC]"
                />
                <button
                  onClick={handleAddMember}
                  className="bg-[#3283EC] text-white rounded-lg px-3 py-1 flex items-center gap-1 hover:bg-[#2779E3] transition"
                >
                  <UserPlus size={16} /> Add
                </button>
              </div>
            </div>

            <div className="border rounded-lg max-h-60 overflow-y-auto">
              {membersLoading ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#3283EC] mx-auto"></div>
                  <span className="ml-2 text-sm text-gray-500">
                    Loading members...
                  </span>
                </div>
              ) : members.length > 0 ? (
                members.map((member) => (
                  <div
                    key={member.id}
                    className="flex justify-between items-center p-3 border-b last:border-b-0 hover:bg-gray-50"
                  >
                    <div>
                      <div className="font-medium">
                        {member.name || member.email}
                      </div>
                      <div className="text-sm text-gray-500">
                        {member.email} {member.phone && `• ${member.phone}`}
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveMember(member.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Remove member"
                    >
                      <UserMinus size={18} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No members in this group
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setEditPopup(null)}
              className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveEdit}
              className="px-4 py-2 bg-[#3283EC] text-white rounded-full hover:bg-[#2779E3] transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      </Modal>

      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-[20px]">Contact Groups</h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search groups..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-full pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3283EC]"
            />
          </div>

          <button
            className="border border-[#F10000] text-[#F10000] rounded-full px-4 py-2 flex items-center gap-2 hover:bg-[#FDECEC] transition"
            onClick={() => selected && handleDelete(selected)}
            disabled={!selected}
          >
            <Trash2 size={18} /> Delete
          </button>
          <button
            onClick={handleAdd}
            className="border border-[#3283EC] text-[#3283EC] rounded-full px-4 py-2 flex items-center gap-2 hover:bg-[#EAF3FF] transition"
          >
            <PlusCircle size={18} /> Add Group
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl">
        <table className="w-full">
          <thead className="">
            <tr className="bg-gradient-to-b from-[#4A98FF] to-[#2779E3] text-white text-left text-base rounded-tr-full">
              <th className="py-3 px-4 rounded-l-full">S.N</th>
              <th className="py-3 px-4">Group Name</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Members</th>
              <th className="py-3 px-4">Created Date</th>
              <th className="py-3 px-4 rounded-r-full">Action</th>
            </tr>
          </thead>

          <tbody className="text-[16px] rounded-3xl">
            {filteredGroups.length > 0 ? (
              filteredGroups.map((group, index) => (
                <tr
                  key={group.id}
                  className={`border-b border-gray-200 hover:bg-[#EAF3FF] transition rounded-2xl ${
                    selected1.includes(group.id) ? "bg-[#EAF3FF]" : ""
                  }`}
                >
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selected1.includes(group.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelected1([...selected1, group.id]);
                        } else {
                          setSelected1(
                            selected1.filter((id) => id !== group.id)
                          );
                        }
                      }}
                      className="accent-[#3283EC]"
                    />
                    <span className="ml-2">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                  </td>
                  <td className="py-3 px-4">{group.name}</td>
                  <td className="py-3 px-4">{group.description}</td>
                  <td className="py-3 px-4">
                    {group.member_count || group.contact_count}
                  </td>
                  <td className="py-3 px-4">{formatDate(group.created_at)}</td>
                  <td className="py-3 px-4 flex items-center gap-3">
                    <CheckCircle
                      size={18}
                      className="text-green-600 cursor-pointer hover:scale-110 transition"
                      title="Select Group"
                    />
                    <Edit
                      size={18}
                      onClick={() => handleEdit(group.id)}
                      className="text-[#E5C100] cursor-pointer hover:scale-110 transition"
                      title="Edit Group"
                    />
                    <Trash2
                      size={18}
                      onClick={() => handleDelete(group.id)}
                      className="text-[#F10000] cursor-pointer hover:scale-110 transition"
                      title="Delete Group"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-500 text-base"
                >
                  {groups.length === 0
                    ? "No groups found."
                    : "No groups match your search."}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-between text-sm text-gray-500 px-4 py-2">
          <span>
            Showing 1 to {filteredGroups.length} of {groups.length} entries
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
