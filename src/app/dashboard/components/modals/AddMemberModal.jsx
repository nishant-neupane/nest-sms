import { useState } from "react";
import { Modal } from "../../../../components/reusable/Modal";

export const AddMemberModal = ({ isOpen, onClose, onAddMember }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      onAddMember(formData);
      setFormData({ name: "", email: "" });
      onClose();
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Member">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[#565656] mb-1">
            Name <span className="text-[#F10000]">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#565656]"
            placeholder="Enter name"
            required
          />
        </div>

        <div>
          <label className="block text-[#565656] mb-1">
            Email <span className="text-[#F10000]">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#565656]"
            placeholder="Enter email "
            required
          />
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="py-2 px-6 bg-gradient-to-r from-[#005FDB] to-[#2584FF] text-white rounded-full hover:scale-[1.03] transition-all duration-300 cursor-pointer font-bold text-lg"
          >
            Add Member
          </button>
        </div>
      </form>
    </Modal>
  );
};
