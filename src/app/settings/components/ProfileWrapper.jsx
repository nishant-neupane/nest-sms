"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Lock } from "lucide-react";

export default function ProfileWrapper({ children }) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Profile", icon: <User size={18} />, href: "/settings/profile" },
    { name: "Security", icon: <Lock size={18} />, href: "/settings/security" },
  ];

  return (
    <div className="flex gap-4">
      <aside className="w-64 bg-[#F6F6F6] border-r border-[#F6F6F6] p-6">
        <h2 className="text-xl font-semibold mb-6">Settings</h2>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                pathname === item.href
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:bg-[#F6F6F6]"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 ">{children}</main>
    </div>
  );
}
