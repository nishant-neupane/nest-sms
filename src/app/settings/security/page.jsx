"use client";
import React, { useState } from "react";
import {
  CreditCard,
  Eye,
  EyeOff,
  IdCard,
  LockKeyhole,
  SquareUserRoundIcon,
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Security");

  const renderContent = () => {
    switch (activeTab) {
      case "Profile":
        return <ProfileSection />;
      case "Security":
        return <SecuritySection />;
      case "KYC":
        return <KYCSection />;
      case "Payment":
        return <PaymentSection />;
      default:
        return <ProfileSection />;
    }
  };
  return (
    <div className="h-[calc(100vh-24px)] grid grid-cols-7 gap-3 ">
      <div className="col-span-6 p-8 rounded-md shadow-sm bg-[#F6F6F6]">
        {renderContent()}
      </div>
    </div>
  );
}

function ProfileSection() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4"> Profile</h2>
      <p>This is the profile section.</p>
    </div>
  );
}

function SecuritySection() {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [oldValue, setOldValue] = useState("");
  const [newValue, setNewValue] = useState("");
  const [confirmValue, setConfirmValue] = useState("");

  return (
    <div>
      <h2 className="text-xl font-bold mb-6 text-[#595959]">Change Password</h2>

      <div className="grid grid-cols-2 gap">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <label className="block text-[15px] font-medium text-[#9E9E9E] mb-1">
              Old Password
            </label>
            <input
              type={showOld ? "text" : "password"}
              className="border border-[#BCBCBC] text-[#1F1F1F] text-[15px] rounded-xl px-3 py-2 pr-10 outline-none focus:border-[#9E9E9E] w-[300px]"
              placeholder=""
              value={oldValue}
              onChange={(e) => setOldValue(e.target.value)}
              autoComplete="current-password"
            />
            {oldValue && (
              <button
                type="button"
                className="absolute left-67 bottom-0.5 transform -translate-y-1/2 text-[#9E9E9E]"
                onClick={() => setShowOld(!showOld)}
              >
                {showOld ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            )}
          </div>

          <div className="relative">
            <label className="block text-[15px] font-medium text-[#9E9E9E] mb-1">
              Confirm Password
            </label>
            <input
              type={showConfirm ? "text" : "password"}
              className=" w-[300px] border border-[#BCBCBC] text-[#1F1F1F] text-[15px] rounded-xl px-3 py-2 pr-10 outline-none focus:border-[#9E9E9E]"
              placeholder=""
              value={confirmValue}
              onChange={(e) => setConfirmValue(e.target.value)}
              autoComplete="new-password"
            />
            {confirmValue && (
              <div className="relative">
                <button
                  type="button"
                  className="absolute right-[80px] -top-5 transform -translate-y-1/2 text-[#9E9E9E]"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="relative">
            <label className="block text-[15px] font-medium text-[#9E9E9E] mb-1">
              New Password
            </label>
            <input
              type={showNew ? "text" : "password"}
              className=" w-[300px] border border-[#BCBCBC] text-[#1F1F1F] rounded-xl px-3 py-2 pr-10 outline-none focus:border-[#9E9E9E]"
              placeholder=""
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              autoComplete="new-password"
            />
            {newValue && (
              <button
                type="button"
                className="absolute right-[80px] bottom-1 transform -translate-y-1/2 text-[#9E9E9E]"
                onClick={() => setShowNew(!showNew)}
              >
                {showNew ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        <button className="bg-gradient-to-b from-[#0362DE] to-[#1F7EF9] text-white px-5 py-2 rounded-full font-medium hover:opacity-90 transition">
          Save Changes
        </button>
        <button className="border border-[#F10000] text-[#F10000] px-5 py-2 rounded-full font-medium hover:bg-red-50 transition">
          Cancel
        </button>
      </div>
    </div>
  );
}

function KYCSection() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">KYC</h2>
      <p className="text-black">Your KYC details will appear here.</p>
    </div>
  );
}

function PaymentSection() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Payment</h2>
      <p className="text-black">Manage your payment and billing details.</p>
    </div>
  );
}
