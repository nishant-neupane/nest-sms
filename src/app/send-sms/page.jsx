"use client";
import { useState, useEffect } from "react";
import { User, Users, Settings } from "lucide-react";

export default function SendSMS() {
  const [senderId, setSenderId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("9865672831");
  const [recipients, setRecipients] = useState(["Mahendrangr@gmail.com"]);
  const [template, setTemplate] = useState("");
  const [message, setMessage] = useState("");
  const [isNepali, setIsNepali] = useState(false);
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);

  // Simulate typing indicator when message is being typed
  useEffect(() => {
    if (message) {
      setShowTypingIndicator(true);
      const timer = setTimeout(() => {
        setShowTypingIndicator(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
        <div className="space-y-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sender ID :
              </label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                value={senderId}
                onChange={(e) => setSenderId(e.target.value)}
              >
                <option value="">Select Sender ID</option>
                <option value="info">INFO</option>
                <option value="promo">PROMO</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <button className="text-blue-600 text-sm font-medium hover:underline whitespace-nowrap">
                  Request New
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Recipients
            </label>
            <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 flex-wrap">
              {recipients.map((r, i) => (
                <div
                  key={i}
                  className="flex items-center bg-blue-50 text-blue-700 px-2 py-1 rounded-lg text-sm"
                >
                  {r}
                  <button
                    onClick={() =>
                      setRecipients((prev) =>
                        prev.filter((_, index) => index !== i)
                      )
                    }
                    className="ml-2 text-red-500"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <input
                type="email"
                placeholder="Add recipient..."
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value.trim()) {
                    setRecipients((prev) => [...prev, e.target.value.trim()]);
                    e.target.value = "";
                  }
                }}
                className="flex-1 border-none outline-none text-sm"
              />
              <div className="flex items-center gap-1 text-gray-400">
                <User size={18} />
                <Users size={18} />
                <Settings size={18} />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              SMS Template
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
            >
              <option value="">Choose a template</option>
              <option value="welcome">Welcome Message</option>
              <option value="offer">Special Offer</option>
              <option value="reminder">Payment Reminder</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message :
            </label>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={isNepali}
                onChange={(e) => setIsNepali(e.target.checked)}
              />
              <span className="text-sm text-gray-700">Type in Nepali</span>
            </div>
            <textarea
              className={`w-full border border-gray-300 rounded-lg px-3 py-3 h-28 resize-none focus:ring-2 focus:ring-blue-500 outline-none ${
                isNepali ? "font-[Mangal]" : ""
              }`}
              placeholder="Type your message here..."
              maxLength={300}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="text-xs text-gray-500 mt-1 flex justify-between">
              <span>{message.length}/300 Words</span>
              <span>1 SMS</span>
            </div>
          </div>

          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Send SMS
          </button>
        </div>

        <div className="flex justify-center items-center">
          <div
            className="relative w-[250px] h-[500px] rounded-[3rem] bg-[#C5A37D] shadow-2xl flex justify-center items-center 
    before:content-[''] before:absolute before:bottom-[-25px] before:left-1/2 before:-translate-x-1/2 
    before:w-[60%] before:h-[15px] before:bg-black/30 before:blur-md before:rounded-full"
          >
            <div className="absolute inset-[6px] bg-white rounded-[3rem] "></div>
            <div className="relative w-[92%] h-[96%] bg-black rounded-[2.5rem] flex justify-center items-center shadow-inner">
              <div className="relative w-[92%] h-[96%] bg-white rounded-[2rem] overflow-hidden z-10">
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full"></div>

                <div className="absolute top-3.5 left-0 w-full px-5 flex justify-between items-center text-xs text-gray-800">
                  <span>9:41</span>
                  <div className="flex gap-1 items-center">
                    <span className="w-1 h-1 bg-gray-800 rounded-full"></span>
                    <span className="w-1 h-1 bg-gray-800 rounded-full"></span>
                  </div>
                </div>

                <div className="absolute inset-0 flex flex-col pt-16 gap-4 px-4 overflow-y-auto">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gray-300 flex-shrink-0"></div>
                    <div className="max-w-[70%]">
                      <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-2">
                        <p className="text-sm text-gray-800">
                          Hello! How can I help you?
                        </p>
                      </div>
                      <span className="text-xs text-gray-500 mt-1 block">
                        10:30 AM
                      </span>
                    </div>
                  </div>

                  {/* Typing Indicator */}
                  {showTypingIndicator && (
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-gray-300 flex-shrink-0"></div>
                      <div className="max-w-[70%]">
                        <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

               

                  {/* Placeholder when no message */}
                  {!message && (
                    <>
                      <div className="self-end flex items-start gap-3">
                        <div className="max-w-[70%]">
                          <div className="bg-blue-500 text-white rounded-2xl rounded-tr-none px-4 py-2">
                            <p className="text-sm">
                              Your message will appear here
                            </p>
                          </div>
                          <span className="text-xs text-gray-500 mt-1 block text-right">
                            10:31 AM
                          </span>
                        </div>
                        <div className="w-6 h-6 rounded-full bg-blue-300 flex-shrink-0"></div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="absolute left-[-4px] top-20 w-1 h-10 bg-[#C5A37D] rounded-r-full shadow-md"></div>
            <div className="absolute left-[-4px] top-36 w-1 h-10 bg-[#C5A37D] rounded-r-full shadow-md"></div>
            <div className="absolute right-[-4px] top-28 w-1 h-16 bg-[#C5A37D] rounded-l-full shadow-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
