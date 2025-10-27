"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  Phone,
  FileText,
  BarChart,
  Code,
  CreditCard,
  Settings,
  LogOut,
  Users,
  ChevronDown,
  ChevronUp,
  UserCircle,
  UsersRound,
  Send,
  Clock,
  Calendar,
  Key,
  BookOpen,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [openDropdowns, setOpenDropdowns] = useState({
    contacts: false,
    smsReport: false,
    apiIntegration: false,
  });

  const toggleDropdown = (key) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const menu = [
    {
      title: "Menu",
      items: [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "Send SMS", href: "/send-sms", icon: MessageSquare },
        {
          name: "Contacts",
          href: "/contacts",
          icon: Phone,
          hasDropdown: true,
          dropdownKey: "contacts",
          subItems: [
            {
              name: "Individual",
              href: "/contacts/individual",
              icon: UserCircle,
            },
            { name: "Group", href: "/contacts/group", icon: UsersRound },
          ],
        },
        { name: "SMS Batch", href: "/sms-batch", icon: Users },
        { name: "SMS Files", href: "/sms-files", icon: FileText },
        {
          name: "SMS Report",
          href: "/sms-report",
          icon: BarChart,
          hasDropdown: true,
          dropdownKey: "smsReport",
          subItems: [
            { name: "Sent SMS", href: "/sms-report/sent-sms", icon: Send },
            { name: "Queued SMS", href: "/sms-report/queued-sms", icon: Clock },
            {
              name: "Scheduled SMS",
              href: "/sms-report/scheduled-sms",
              icon: Calendar,
            },
          ],
        },
        {
          name: "API Integration",
          href: "/api-integration",
          icon: Code,
          hasDropdown: true,
          dropdownKey: "apiIntegration",
          subItems: [
            { name: "API Token", href: "/api-integration/api-token", icon: Key },
            { name: "API Docs", href: "/api-integration/api-docs", icon: BookOpen },
          ],
        },
        { name: "Transactions", href: "/transactions", icon: CreditCard },
      ],
    },
    {
      title: "General",
      items: [
        { name: "Settings", href: "/settings", icon: Settings },
        { name: "Logout", href: "/logout", icon: LogOut },
      ],
    },
  ];

  return (
    <div className="ml-6 relative ">
      <aside className="fixed left-0 top-0 h-screen w-64 bg-[#F6F6F6] border-r shadow-sm z-20">
        <Link
          href="/dashboard"
          className="flex items-center justify-center h-16 font-semibold text-lg border-b"
        >
          <Image
            src="/images/home/nest-sms.png"
            width={180}
            height={40}
            alt="nest-sms"
            className="object-contain"
          />
        </Link>

        <nav className="p-4 space-y-6 overflow-y-auto h-[calc(100vh-4rem)]">
          {menu.map((section) => (
            <div key={section.title}>
              <h2 className="text-[18px] tracking-wide my-6 text-[#949494]">
                {section.title}
              </h2>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active =
                    pathname === item.href ||
                    (item.subItems &&
                      item.subItems.some((sub) => pathname === sub.href));
                  const isDropdownOpen =
                    item.hasDropdown && openDropdowns[item.dropdownKey];

                  return (
                    <div key={item.name}>
                      <div className="relative">
                        {active && (
                          <div className="absolute -left-5 top-1/2 -translate-y-1/2 w-3 h-10 bg-gradient-to-b from-[#4896FD] to-[#287AE4] rounded-lg overflow-hidden" />
                        )}
                        {item.hasDropdown ? (
                          <button
                            onClick={() => toggleDropdown(item.dropdownKey)}
                            className={`group flex items-center justify-between w-full py-3 pl-3 rounded-lg transition-colors ${
                              active
                                ? "bg-gradient-to-r from-[#4896FD] to-[#287AE4] text-transparent bg-clip-text font-bold"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            <div className="flex gap-4 items-center">
                              <Icon
                                size={28}
                                strokeWidth={1.8}
                                className={` ${
                                  active
                                    ? "stroke-[#287AE4] fill-[#287AE4]"
                                    : "stroke-[#949494] fill-transparent group-hover:stroke-[#287AE4] group-hover:fill-[#287AE4]"
                                }`}
                              />
                              <p
                                className={`text-lg tracking-wider ${
                                  active ? "text-[#3283EC] font-semibold " : ""
                                } `}
                              >
                                {item.name}
                              </p>
                            </div>
                            {isDropdownOpen ? (
                              <ChevronUp
                                size={20}
                                className={
                                  active
                                    ? "stroke-[#287AE4]"
                                    : "stroke-[#949494]"
                                }
                              />
                            ) : (
                              <ChevronDown
                                size={20}
                                className={
                                  active
                                    ? "stroke-[#287AE4]"
                                    : "stroke-[#949494]"
                                }
                              />
                            )}
                          </button>
                        ) : (
                          <Link
                            href={item.href}
                            className={`group flex items-center gap-3 py-3 pl-3 rounded-lg transition-colors ${
                              active
                                ? "bg-gradient-to-r from-[#4896FD] to-[#287AE4] text-transparent bg-clip-text font-bold"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            <div className="flex gap-4 items-center">
                              <Icon
                                size={28}
                                strokeWidth={1.8}
                                className={` ${
                                  active
                                    ? "stroke-[#287AE4] fill-[#287AE4]"
                                    : "stroke-[#949494] fill-transparent group-hover:stroke-[#287AE4] group-hover:fill-[#287AE4]"
                                }`}
                              />
                              <p
                                className={`text-lg tracking-wider ${
                                  active ? "text-[#3283EC] font-semibold " : ""
                                } `}
                              >
                                {item.name}
                              </p>
                            </div>
                          </Link>
                        )}
                      </div>

                      {item.hasDropdown && isDropdownOpen && (
                        <div className="ml-12 mt-1 space-y-1">
                          {item.subItems.map((subItem) => {
                            const SubIcon = subItem.icon;
                            const subActive = pathname === subItem.href;
                            return (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className={`group flex items-center gap-3 py-2 rounded-lg transition-colors ${
                                  subActive
                                    ? "bg-gradient-to-r from-[#4896FD] to-[#287AE4] text-transparent bg-clip-text font-bold"
                                    : "text-gray-700 hover:bg-gray-100"
                                }`}
                              >
                                <SubIcon
                                  size={24}
                                  strokeWidth={1.8}
                                  className={
                                    subActive
                                      ? "stroke-[#287AE4] fill-[#287AE4]"
                                      : "stroke-[#949494] fill-transparent group-hover:stroke-[#287AE4] group-hover:fill-[#287AE4]"
                                  }
                                />
                                <p
                                  className={`text-base tracking-wider ${
                                    subActive
                                      ? "text-[#3283EC] font-semibold"
                                      : ""
                                  }`}
                                >
                                  {subItem.name}
                                </p>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </div>
  );
}
