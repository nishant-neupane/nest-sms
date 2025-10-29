"use client";
import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { fetchUser } from "@/services/api";

export default function Header() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const userData = await fetchUser();

        if (userData) {
          setUser(userData);
        } else {
          setError("Failed to load user data");
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  return (
    <div className="pb-2">
      <div className="bg-[#f9f9f9] rounded-xl flex items-center justify-between p-4">
        {/* Organization */}
        <div>
          <p className="text-sm font-medium text-[#000000]/50">Organization:</p>
          {loading ? (
            <div className="w-32 h-6 bg-gray-200 rounded animate-pulse" />
          ) : user?.organization?.name ? (
            <h2 className="text-2xl font-bold text-[#3283EC]">
              {user.organization.name}
            </h2>
          ) : (
            <h2 className="text-2xl font-bold text-[#3283EC]">N/A</h2>
          )}
        </div>

        {/* Notifications + User Info */}
        <div className="flex items-center gap-4">
          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-sm">
            <Bell className="text-[#949494] w-6 h-6" />
          </button>

          <div className="flex items-center gap-3">
            {/* Avatar */}
            {loading ? (
              <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
            ) : user ? (
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#60a5fa]" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold">
                ?
              </div>
            )}

            <div>
              {loading ? (
                <>
                  <div className="w-32 h-5 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="w-40 h-4 bg-gray-200 rounded animate-pulse" />
                </>
              ) : user ? (
                <>
                  <p className="text-[#3283EC] font-bold text-lg leading-none">
                    {user.full_name}
                  </p>
                  <p className="text-sm text-[#000000]/50 font-[500] leading-none mt-2">
                    {user.email}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-[#3283EC] font-bold text-lg leading-none">
                    Not Logged In
                  </p>
                  <p className="text-sm text-[#000000]/50 font-[500] leading-none mt-2">
                    Please login
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
