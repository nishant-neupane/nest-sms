"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageSquare, FileText, Settings } from "lucide-react";

const menu = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Send SMS", href: "/send-sms", icon: MessageSquare },
  { name: "Contacts", href: "/contacts", icon: MessageSquare },
  { name: "SMS Batch", href: "/sms-batch", icon: MessageSquare },
  { name: "SMS Files", href: "/sms-files", icon: MessageSquare },
  { name: "SMS Report", href: "/sms-report", icon: MessageSquare },
  { name: "API Integration", href: "/api-integration", icon: MessageSquare },
  { name: "Transactions", href: "/transactions", icon: MessageSquare },
  { name: "Settings", href: "/settings", icon: FileText },
  { name: "Layout", href: "/layout", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white shadow-md border-r z-20">
      <div className="flex items-center justify-center h-16 font-semibold text-lg border-b">
        NEST SMS
      </div>
      <nav className="p-4 space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                active
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
