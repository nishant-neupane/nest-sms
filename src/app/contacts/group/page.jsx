"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Edit,
  Trash2,
  PlusCircle,
  CheckCircle,
  UserPlus,
  UserMinus,
} from "lucide-react";
import {
  fetchGroup,
  createGroup,
  updateGroup,
  deleteGroup,
} from "@/services/api";
import { Modal } from "@/app/dashboard/components/modals/Modal";

export default function ContactList() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [search, setSearch] = useState("");

  const [editPopup, setEditPopup] = useState(null);
  const [newMember, setNewMember] = useState("");
  const [members, setMembers] = useState([]);
  const [membersLoading, setMembersLoading] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDesc, setNewGroupDesc] = useState("");

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setLoading(true);
        const res = await fetchGroup();
        const data = await res.json();
        setGroups(data.groups || []);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, []);

  useEffect(() => {
    const fetchMembers = async () => {
      if (!editPopup) return;
      try {
        setMembersLoading(true);
        const res = await fetch(`/api/contacts/groups/${editPopup.id}/members`);
        if (!res.ok) throw new Error("Failed to fetch members");
        const data = await res.json();
        setMembers(data.members || []);
      } catch (err) {
        console.error(err);
        setMembers([]);
      } finally {
        setMembersLoading(false);
      }
    };
    fetchMembers();
  }, [editPopup]);

  const handleDeleteSelected = async () => {
    if (!selectedGroups.length) return;

    try {
      await Promise.all(selectedGroups.map((id) => deleteGroup(id)));
      setGroups(groups.filter((g) => !selectedGroups.includes(g.id)));
      setSelectedGroups([]);
      setShowDeleteModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  // Delete single group from row
  const handleDeleteSingle = (id) => {
    setSelectedGroups([id]);
    setShowDeleteModal(true);
  };

  // Edit group
  const handleSaveEdit = async () => {
    if (!editPopup) return;
    try {
      const updated = await updateGroup(editPopup.id, {
        name: editPopup.name,
        description: editPopup.description,
      });
      setGroups(
        groups.map((g) => (g.id === editPopup.id ? { ...g, ...updated } : g))
      );
      setEditPopup(null);
    } catch (err) {
      console.error(err);
    }
  };

  // Add member to group
  const handleAddMember = async () => {
    if (!newMember.trim() || !editPopup) return;
    try {
      const res = await fetch(`/api/contacts/groups/${editPopup.id}/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newMember }),
      });
      if (!res.ok) throw new Error("Failed to add member");
      const memberData = await res.json();
      setMembers([...members, memberData]);
      setEditPopup({
        ...editPopup,
        member_count: (editPopup.member_count || 0) + 1,
      });
      setGroups(
        groups.map((g) =>
          g.id === editPopup.id
            ? { ...g, member_count: (g.member_count || 0) + 1 }
            : g
        )
      );
      setNewMember("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveMember = async (memberId) => {
    try {
      await fetch(`/api/contacts/groups/${editPopup.id}/members/${memberId}`, {
        method: "DELETE",
      });
      setMembers(members.filter((m) => m.id !== memberId));
      setEditPopup({
        ...editPopup,
        member_count: Math.max(0, (editPopup.member_count || 0) - 1),
      });
      setGroups(
        groups.map((g) =>
          g.id === editPopup.id
            ? { ...g, member_count: Math.max(0, (g.member_count || 0) - 1) }
            : g
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Add new group
  const handleAddGroup = async () => {
    if (!newGroupName.trim() || !newGroupDesc.trim()) return;
    try {
      const newGroup = await createGroup({
        name: newGroupName,
        description: newGroupDesc,
      });
      setGroups([...groups, newGroup]);
      setShowAddModal(false);
      setNewGroupName("");
      setNewGroupDesc("");
    } catch (err) {
      console.error(err);
    }
  };

  const filteredGroups = groups.filter(
    (g) =>
      (g.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (g.description || "").toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="p-6">Loading groups...</div>;
  if (error)
    return (
      <div className="p-6 text-red-500">
        Error loading groups: {error}
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );

  return (
    <div className="p-6 bg-[#F6F6F6] rounded-2xl">
      {/* Edit Group Modal */}
      <Modal
        isOpen={!!editPopup}
        onClose={() => setEditPopup(null)}
        title={`Edit Group - ${editPopup?.name || ""}`}
      >
        <div className="space-y-4">
          <div>
            <label>Group Name</label>
            <input
              type="text"
              value={editPopup?.name || ""}
              onChange={(e) =>
                setEditPopup({ ...editPopup, name: e.target.value })
              }
              className="w-full border px-3 py-2 rounded-lg"
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              value={editPopup?.description || ""}
              onChange={(e) =>
                setEditPopup({ ...editPopup, description: e.target.value })
              }
              rows={3}
              className="w-full border px-3 py-2 rounded-lg"
            />
          </div>
          <div>
            <label>Members ({members.length})</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Add new member..."
                value={newMember}
                onChange={(e) => setNewMember(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddMember()}
                className="border rounded-lg px-3 py-1 flex-1"
              />
              <button
                onClick={handleAddMember}
                className="bg-[#3283EC] text-white px-3 rounded-lg flex items-center gap-1"
              >
                <UserPlus size={16} /> Add
              </button>
            </div>
            <div className="border rounded-lg max-h-60 overflow-y-auto">
              {members.length ? (
                members.map((m) => (
                  <div
                    key={m.id}
                    className="flex justify-between p-2 border-b hover:bg-gray-50"
                  >
                    <span>{m.name || m.email}</span>
                    <button
                      onClick={() => handleRemoveMember(m.id)}
                      className="text-red-500"
                    >
                      <UserMinus size={16} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-2 text-gray-500">
                  No members in this group
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setEditPopup(null)}
              className="px-4 py-2 border rounded-full"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveEdit}
              className="px-4 py-2 bg-[#3283EC] text-white rounded-full"
            >
              Save Changes
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Groups Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Group(s)"
      >
        <p>
          Are you sure you want to delete {selectedGroups.length} group
          {selectedGroups.length > 1 ? "s" : ""}?
        </p>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="px-4 py-2 border rounded-full"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteSelected}
            className="px-4 py-2 bg-red-500 text-white rounded-full"
          >
            Delete
          </button>
        </div>
      </Modal>

      {/* Add Group Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Group"
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Group Name"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            className="w-full border px-3 py-2 rounded-lg"
          />
          <textarea
            placeholder="Description"
            value={newGroupDesc}
            onChange={(e) => setNewGroupDesc(e.target.value)}
            rows={3}
            className="w-full border px-3 py-2 rounded-lg"
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 border rounded-full"
            >
              Cancel
            </button>
            <button
              onClick={handleAddGroup}
              className="px-4 py-2 bg-[#3283EC] text-white rounded-full"
            >
              Add Group
            </button>
          </div>
        </div>
      </Modal>

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Contact Groups</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search size={18} className="absolute left-2 top-2 text-gray-400" />
            <input
              type="text"
              placeholder="Search groups..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-2 py-2 border rounded-full text-sm focus:ring-2 focus:ring-[#3283EC]"
            />
          </div>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="border border-red-500 text-red-500 px-4 rounded-full flex items-center gap-1"
            disabled={!selectedGroups.length}
          >
            <Trash2 size={16} /> Delete
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="border border-[#3283EC] text-[#3283EC] px-4 rounded-full flex items-center gap-1"
          >
            <PlusCircle size={16} /> Add Group
          </button>
        </div>
      </div>

      {/* Table */}
      <table className="w-full">
        <thead className="bg-[#2779E3] text-white">
          <tr>
            <th className="py-2 px-4 rounded-l-full">S.N</th>
            <th className="py-2 px-4">Group Name</th>
            <th className="py-2 px-4">Description</th>
            <th className="py-2 px-4">Members</th>
            <th className="py-2 px-4">Created</th>
            <th className="py-2 px-4 rounded-r-full">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredGroups.length ? (
            filteredGroups.map((g, idx) => (
              <tr key={g.id ?? idx} className="hover:bg-[#EAF3FF]">
                <td className="py-2 px-4">
                  <input
                    type="checkbox"
                    checked={selectedGroups.includes(g.id)}
                    onChange={(e) => {
                      if (e.target.checked)
                        setSelectedGroups([...selectedGroups, g.id]);
                      else
                        setSelectedGroups(
                          selectedGroups.filter((id) => id !== g.id)
                        );
                    }}
                  />
                  <span className="ml-2">
                    {(idx + 1).toString().padStart(2, "0")}
                  </span>
                </td>
                <td className="py-2 px-4">{g.name}</td>
                <td className="py-2 px-4">{g.description}</td>
                <td className="py-2 px-4">
                  {g.member_count || g.contact_count}
                </td>
                <td className="py-2 px-4">
                  {new Date(g.created_at).toLocaleDateString("en-GB")}
                </td>
                <td className="py-2 px-4 flex gap-2">
                  <CheckCircle size={18} className="text-green-600" />
                  <Edit
                    size={18}
                    onClick={() => setEditPopup(g)}
                    className="text-yellow-500 cursor-pointer"
                  />
                  <Trash2
                    size={18}
                    onClick={() => handleDeleteSingle(g.id)}
                    className="text-red-500 cursor-pointer"
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-500">
                {groups.length
                  ? "No groups match your search"
                  : "No groups found"}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
