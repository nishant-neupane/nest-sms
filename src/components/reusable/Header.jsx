"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });
        const data = await res.json();
        setUser(data.user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  const fallbackUser = {
    full_name: "Your Name",
    email: "yourname@example.com",
    organization: { name: "Test Organization" },
  };

  const displayUser = user || fallbackUser;

  return (
    <div className="pb-2">
      <div className="bg-[#f9f9f9] rounded-xl flex items-center justify-between p-4">
        <div>
          <p className="text-sm font-medium text-[#000000]/50">Organization:</p>
          <h2 className="text-2xl font-bold text-[#3283EC]">
            {displayUser.organization?.name || "N/A"}
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-sm">
            <Bell className="text-[#949494] w-6 h-6" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#60a5fa]" />
            <div>
              <p className="text-[#3283EC] font-bold text-lg leading-none">
                {displayUser.full_name}
              </p>
              <p className="text-sm text-[#000000]/50 font-[500] leading-none mt-2">
                {displayUser.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
