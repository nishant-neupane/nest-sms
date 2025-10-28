"use client";
import { useState, useEffect } from "react";
import { User, Users, Upload, X } from "lucide-react";

export default function SendSMS() {
  const [senderIdType, setSenderIdType] = useState("");
  const [selectedSenderId, setSelectedSenderId] = useState("suraj");
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState("9841788477");
  const [phoneNumbers] = useState(["9841788477"]);
  const [recipients, setRecipients] = useState([]);
  const [newRecipient, setNewRecipient] = useState("");
  const [template, setTemplate] = useState("");
  const [message, setMessage] = useState("");
  const [isNepali, setIsNepali] = useState(false);
  const [selectedVariable, setSelectedVariable] = useState("");

  const senderIds = ["suraj", "nishant"];

  const templates = {
    birthday:
      "Happy Birthday {firstName}! Wishing you a wonderful day filled with joy and happiness.",
    anniversary:
      "Happy Anniversary {firstName} {lastName}! Celebrating your special day with warm wishes.",
    promotion:
      "Hi {firstName}, Special offer just for you! Get 20% off on your next purchase.",
    reminder:
      "Dear {firstName} {lastName}, This is a friendly reminder about your upcoming appointment.",
  };

  const variables = [
    { label: "First Name", value: "{firstName}" },
    { label: "Last Name", value: "{lastName}" },
  ];

  useEffect(() => {
    if (template && templates[template]) {
      setMessage(templates[template]);
    }
  }, [template]);

  const addRecipient = () => {
    if (newRecipient.trim() && !recipients.includes(newRecipient.trim())) {
      setRecipients([...recipients, newRecipient.trim()]);
      setNewRecipient("");
    }
  };

  const removeRecipient = (index) => {
    setRecipients(recipients.filter((_, i) => i !== index));
  };

  const insertVariable = (variable) => {
    setMessage(message + variable);
    setSelectedVariable("");
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Handle file upload logic here
      console.log("File uploaded:", file.name);
    }
  };

  return (
    <div className="bg-[#F6F6F6] h-full  flex items-center p-4">
      <div className="w-full rounded-lg grid grid-cols-1 md:grid-cols-5 gap-8 p-8">
        <div className="space-y-5 md:col-span-3">
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sender ID :
              </label>
              <div className="relative border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="senderType"
                    checked={senderIdType === "senderId"}
                    onChange={() => setSenderIdType("senderId")}
                    className="w-4 h-4 text-blue-600 flex-shrink-0"
                  />
                  <select
                    className="flex-1 border-none outline-none bg-transparent"
                    value={selectedSenderId}
                    onChange={(e) => setSelectedSenderId(e.target.value)}
                    disabled={senderIdType !== "senderId"}
                  >
                    {senderIds.map((id) => (
                      <option key={id} value={id} className="capitalize">
                        {id}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <button className="text-blue-600 text-sm font-medium hover:underline">
                  Request New
                </button>
              </div>
              <div className="relative border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="senderType"
                    checked={senderIdType === "phoneNumber"}
                    onChange={() => setSenderIdType("phoneNumber")}
                    className="w-4 h-4 text-blue-600 flex-shrink-0"
                  />
                  <select
                    className="flex-1 border-none outline-none bg-transparent"
                    value={selectedPhoneNumber}
                    onChange={(e) => setSelectedPhoneNumber(e.target.value)}
                    disabled={senderIdType !== "phoneNumber"}
                  >
                    {phoneNumbers.map((number) => (
                      <option key={number} value={number}>
                        {number}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Recipients
              </label>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-800 px-2 py-1 border border-gray-300 rounded">
                  <User size={14} />
                  Individual
                </button>
                <button className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-800 px-2 py-1 border border-gray-300 rounded">
                  <Users size={14} />
                  Group
                </button>
              </div>
            </div>
            <div className="border border-gray-300 rounded-lg px-3 py-2">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                {recipients.map((r, i) => (
                  <div
                    key={i}
                    className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm"
                  >
                    {r}
                    <button
                      onClick={() => removeRecipient(i)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Add recipient number..."
                  value={newRecipient}
                  onChange={(e) => setNewRecipient(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addRecipient();
                    }
                  }}
                  className="flex-1 border-none outline-none text-sm py-1"
                />
                <label className="cursor-pointer text-gray-600 hover:text-gray-800">
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept=".csv,.xlsx,.xls"
                  />
                  <Upload size={18} />
                </label>
              </div>
            </div>
          </div>

          <div className="flex items-end gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SMS Template
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
              >
                <option value="">Choose a template</option>
                <option value="birthday">Birthday Wishes</option>
                <option value="anniversary">Anniversary Wishes</option>
                <option value="promotion">Promotion</option>
                <option value="reminder">Reminder</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Insert Variable
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                value={selectedVariable}
                onChange={(e) => {
                  if (e.target.value) {
                    insertVariable(e.target.value);
                  }
                }}
              >
                <option value="">Select field</option>
                {variables.map((v) => (
                  <option key={v.value} value={v.value}>
                    {v.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message :
            </label>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={isNepali}
                onChange={(e) => setIsNepali(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700">Type in Nepali</span>
            </div>
            <textarea
              className={`w-full border border-gray-300 rounded-lg px-3 py-3 h-32 resize-none focus:ring-2 focus:ring-blue-500 outline-none ${
                isNepali ? "font-[Mangal]" : ""
              }`}
              placeholder="Type your message here..."
              maxLength={300}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="text-xs text-gray-500 mt-1 flex justify-between">
              <span>{message.length}/300 Characters</span>
              <span>{Math.ceil(message.length / 160)} SMS</span>
            </div>
          </div>

          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Send SMS
          </button>
        </div>

        {/* Phone Preview */}
        <div className="flex justify-center items-center md:col-span-2">
          <div
            className="relative w-[250px] h-[500px] rounded-[3rem] bg-[#C5A37D] shadow-2xl flex justify-center items-center 
            before:content-[''] before:absolute before:bottom-[-25px] before:left-1/2 before:-translate-x-1/2 
            before:w-[60%] before:h-[15px] before:bg-black/30 before:blur-md before:rounded-full"
          >
            <div className="absolute inset-[6px] bg-white rounded-[3rem]"></div>

            <div className="relative w-[92%] h-[96%] bg-black rounded-[2.5rem] flex justify-center items-center shadow-inner">
              <div className="relative w-[92%] h-[96%] bg-white rounded-[2rem] overflow-hidden z-10">
                {/* Notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full"></div>

                {/* Status Bar */}
                <div className="absolute top-3.5 left-0 w-full px-5 flex justify-between items-center text-xs text-gray-800">
                  <span>9:41</span>
                  <div className="flex gap-1 items-center">
                    <span className="w-1 h-1 bg-gray-800 rounded-full"></span>
                    <span className="w-1 h-1 bg-gray-800 rounded-full"></span>
                  </div>
                </div>

                {/* Messages */}
                <div className="absolute inset-0 flex flex-col pt-16 gap-4 px-4 overflow-y-auto pb-4">
                  {message ? (
                    <div className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex-shrink-0"></div>
                      <div className="max-w-[70%]">
                        <div className="bg-gray-200 text-gray-800 rounded-2xl rounded-tl-none px-4 py-3">
                          <p className="text-sm break-words">{message}</p>
                        </div>
                        <span className="text-xs text-gray-500 mt-1 block">
                          {new Date().toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  ) : (
                    // Skeleton loader when no message
                    <div className="space-y-4">
                      {/* Skeleton message bubbles */}
                      <div className="flex gap-3 animate-pulse">
                        <div className="w-6 h-6 rounded-full bg-gray-300 flex-shrink-0"></div>
                        <div className="max-w-[70%]">
                          <div className=" rounded-2xl rounded-tl-none px-4 py-3">
                            <div className="h-3 bg-gray-300 rounded w-32 mb-2"></div>
                            <div className="h-3 bg-gray-300 rounded w-24"></div>
                          </div>
                          <div className="h-2 bg-gray-200 rounded w-16 mt-1"></div>
                        </div>
                      </div>

                      <div className="flex gap-3 animate-pulse">
                        <div className="w-6 h-6 rounded-full bg-gray-300 flex-shrink-0"></div>
                        <div className="max-w-[70%]">
                          <div className="rounded-2xl rounded-tl-none px-4 py-3">
                            <div className="h-3 bg-gray-300 rounded w-28 mb-2"></div>
                            <div className="h-3 bg-gray-300 rounded w-20"></div>
                          </div>
                          <div className="h-2 bg-gray-200 rounded w-16 mt-1"></div>
                        </div>
                      </div>

                      <div className="flex gap-3 animate-pulse">
                        <div className="w-6 h-6 rounded-full bg-gray-300 flex-shrink-0"></div>
                        <div className="max-w-[70%]">
                          <div className="rounded-2xl rounded-tl-none px-4 py-3">
                            <div className="h-3 bg-gray-300 rounded w-36"></div>
                          </div>
                          <div className="h-2 bg-gray-200 rounded w-16 mt-1"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Side Buttons */}
            <div className="absolute left-[-4px] top-20 w-1 h-10 bg-[#C5A37D] rounded-r-full shadow-md"></div>
            <div className="absolute left-[-4px] top-36 w-1 h-10 bg-[#C5A37D] rounded-r-full shadow-md"></div>
            <div className="absolute right-[-4px] top-28 w-1 h-16 bg-[#C5A37D] rounded-l-full shadow-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
