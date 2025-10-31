// components/modals/PromoCodeModal.jsx
import { useState } from "react";
import { Modal } from "../../../../components/reusable/Modal";

export const PromoCodeModal = ({ isOpen, onClose, onApplyPromo }) => {
  const [promoCode, setPromoCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (promoCode.trim()) {
      onApplyPromo(promoCode);
      setPromoCode("");
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Apply Promo Code">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Enter Promo Code
          </label>
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg font-semibold uppercase"
            placeholder="e.g. SUMMER2024"
            required
          />
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">Current Offer</h4>
          <p className="text-blue-700 text-sm">
            Get <strong>17% OFF</strong> on your next SMS package purchase.
            Valid until December 31, 2024.
          </p>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-2 px-4 bg-gradient-to-b from-[#1A72E4] to-[#004BAC] text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Apply Code
          </button>
        </div>
      </form>
    </Modal>
  );
};
