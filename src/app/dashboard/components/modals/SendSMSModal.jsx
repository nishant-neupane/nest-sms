// components/modals/SendSMSModal.jsx
import { useState, useEffect } from "react";
import { Modal } from "../../../../components/reusable/Modal";

export const SendSMSModal = ({ isOpen, onClose, onSendSMS }) => {
  const [formData, setFormData] = useState({
    senderId: "",
    recipients: "",
    message: "",
    schedule: "now",
    scheduleDate: "",
    scheduleTime: "",
  });

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      // Set default schedule time to next hour
      const now = new Date();
      const nextHour = new Date(now.getTime() + 60 * 60 * 1000);

      const defaultDate = nextHour.toISOString().split("T")[0];
      const defaultTime = nextHour.toTimeString().slice(0, 5);

      setFormData({
        senderId: "",
        recipients: "",
        message: "",
        schedule: "now",
        scheduleDate: defaultDate,
        scheduleTime: defaultTime,
      });
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.senderId && formData.recipients && formData.message) {
      // Validate schedule time if scheduling for later
      if (
        formData.schedule === "later" &&
        (!formData.scheduleDate || !formData.scheduleTime)
      ) {
        alert("Please select both date and time for scheduling");
        return;
      }

      onSendSMS(formData);
      onClose();
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getMinDateTime = () => {
    const now = new Date();
    const nextHour = new Date(now.getTime() + 60 * 60 * 1000); // Minimum 1 hour from now
    return {
      date: nextHour.toISOString().split("T")[0],
      time: nextHour.toTimeString().slice(0, 5),
    };
  };

  const minDateTime = getMinDateTime();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Send SMS">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sender ID
          </label>
          <select
            name="senderId"
            value={formData.senderId}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Sender ID</option>
            <option value="shared">Shared ID</option>
            <option value="dedicated">Dedicated ID</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Recipients
          </label>
          <textarea
            name="recipients"
            value={formData.recipients}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter phone numbers separated by commas (e.g., 9800000000, 9811111111)"
            required
          />
          <div className="text-xs text-gray-500 mt-1">
            Separate multiple numbers with commas
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message here..."
            required
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{formData.message.length}/160 characters</span>
            <span>{Math.ceil(formData.message.length / 160)} SMS</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Schedule
          </label>
          <select
            name="schedule"
            value={formData.schedule}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
          >
            <option value="now">Send Now</option>
            <option value="later">Schedule for Later</option>
          </select>

          {formData.schedule === "later" && (
            <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="scheduleDate"
                  value={formData.scheduleDate}
                  onChange={handleChange}
                  min={minDateTime.date}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  name="scheduleTime"
                  value={formData.scheduleTime}
                  onChange={handleChange}
                  min={
                    formData.scheduleDate === minDateTime.date
                      ? minDateTime.time
                      : undefined
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              {formData.scheduleDate && formData.scheduleTime && (
                <div className="col-span-2 text-center">
                  <p className="text-sm text-gray-600">
                    Scheduled for:{" "}
                    <span className="font-semibold">
                      {new Date(
                        `${formData.scheduleDate}T${formData.scheduleTime}`
                      ).toLocaleString()}
                    </span>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Cost Estimate */}
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
          <div className="flex justify-between items-center text-sm">
            <span className="text-blue-700">Estimated Cost:</span>
            <span className="font-semibold text-blue-800">
              Rs.{" "}
              {(
                (formData.recipients.split(",").filter((num) => num.trim())
                  .length || 0) *
                Math.ceil(formData.message.length / 160) *
                0.9
              ).toFixed(2)}
            </span>
          </div>
          <div className="text-xs text-blue-600 mt-1">
            {formData.recipients.split(",").filter((num) => num.trim())
              .length || 0}{" "}
            recipients × {Math.ceil(formData.message.length / 160)} SMS × Rs.
            0.9 per SMS
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-3 px-4 bg-gradient-to-b from-[#005FDB] to-[#2584FF] text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            {formData.schedule === "now" ? "Send SMS Now" : "Schedule SMS"}
          </button>
        </div>
      </form>
    </Modal>
  );
};
