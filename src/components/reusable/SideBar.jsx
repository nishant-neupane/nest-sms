"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  Phone,
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
  CreditCard as CardIcon,
  Wallet,
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

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Users", href: "/users", icon: Users },
    { name: "Sender ID", href: "/sender-id", icon: CardIcon },
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
        {
          name: "API Token",
          href: "/api-integration/api-token",
          icon: Key,
        },
        {
          name: "API Docs",
          href: "/api-integration/api-docs",
          icon: BookOpen,
        },
      ],
    },
    { name: "Transactions", href: "/transactions", icon: CreditCard },
  ];

  const generalItems = [
    { name: "Settings", href: "/settings/profile", icon: Settings },
    { name: "Payment", href: "/payment", icon: Wallet },
    { name: "Logout", href: "/logout", icon: LogOut },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-[260px] ml-3">
      <aside className=" mt-3 rounded-lg h-[calc(100vh-24px)] gap-2 flex flex-col">
        <div className="flex-shrink-0 bg-[#F6F6F6] rounded-lg">
          <Link
            href="/dashboard"
            className="flex items-center justify-center h-20 font-semibold text-lg"
          >
            <Image
              src="/images/home/nest-sms.png"
              width={190}
              height={40}
              alt="nest-sms"
              className="object-contain"
            />
          </Link>
        </div>

        <div className="flex-1 overflow-hidden bg-[#F6F6F6] rounded-lg">
          <div className="px-4 pt-6 pb-4">
            <h2 className="text-[18px] tracking-wide text-[#949494] mb-4">
              Menu
            </h2>
          </div>

          <nav className="px-4 overflow-y-auto h-[calc(100%-80px)] custom-scrollbar">
            <div className="space-y-1 pb-6">
              {menuItems.map((item) => {
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
                          className={`group flex items-center justify-between w-full py-3 pl-3 pr-2 rounded-lg transition-colors ${
                            active
                              ? "text-[#3283EC] font-semibold"
                              : "text-[#949494] hover:bg-gray-100"
                          }`}
                        >
                          <div className="flex gap-4 items-center">
                            <Icon
                              size={24}
                              strokeWidth={1.8}
                              className={`${
                                active
                                  ? "stroke-[#3283EC]"
                                  : "stroke-[#949494] group-hover:stroke-[#3283EC]"
                              }`}
                            />
                            <span className="text-[15px] tracking-wide">
                              {item.name}
                            </span>
                          </div>
                          {isDropdownOpen ? (
                            <ChevronUp
                              size={18}
                              className={
                                active ? "stroke-[#3283EC]" : "stroke-[#949494]"
                              }
                            />
                          ) : (
                            <ChevronDown
                              size={18}
                              className={
                                active ? "stroke-[#3283EC]" : "stroke-[#949494]"
                              }
                            />
                          )}
                        </button>
                      ) : (
                        <Link
                          href={item.href}
                          className={`group flex items-center gap-4 py-3 pl-3 rounded-lg transition-colors ${
                            active
                              ? "text-[#3283EC] font-semibold"
                              : "text-[#949494] hover:bg-gray-100"
                          }`}
                        >
                          <Icon
                            size={24}
                            strokeWidth={1.8}
                            className={`${
                              active
                                ? "stroke-[#3283EC]"
                                : "stroke-[#949494] group-hover:stroke-[#3283EC]"
                            }`}
                          />
                          <span className="text-[15px] tracking-wide">
                            {item.name}
                          </span>
                        </Link>
                      )}
                    </div>

                    {/* Dropdown */}
                    {item.hasDropdown && isDropdownOpen && (
                      <div className="ml-12 mt-1 space-y-1">
                        {item.subItems.map((subItem) => {
                          const SubIcon = subItem.icon;
                          const subActive = pathname === subItem.href;
                          return (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className={`group flex items-center gap-3 py-2 pl-2 rounded-lg transition-colors ${
                                subActive
                                  ? "text-[#3283EC] font-semibold"
                                  : "text-[#949494] hover:bg-gray-100"
                              }`}
                            >
                              <SubIcon
                                size={20}
                                strokeWidth={1.8}
                                className={
                                  subActive
                                    ? "stroke-[#3283EC]"
                                    : "stroke-[#949494] group-hover:stroke-[#3283EC]"
                                }
                              />
                              <span className="text-[14px] tracking-wide">
                                {subItem.name}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </nav>
        </div>

        <div className="flex-shrink-0 bg-[#F6F6F6] px-4 py-6 rounded-lg">
          <h2 className="text-[18px] tracking-wide text-[#949494] mb-4">
            General
          </h2>
          <div className="space-y-1">
            {generalItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <div key={item.name} className="relative">
                  {active && (
                    <div className="absolute -left-5 top-1/2 -translate-y-1/2 w-1 h-10 bg-[#3283EC] rounded-r-lg" />
                  )}
                  <Link
                    href={item.href}
                    className={`group flex items-center gap-4 py-3 pl-3 rounded-lg transition-colors ${
                      active
                        ? "text-[#3283EC] font-semibold"
                        : "text-[#949494] hover:bg-gray-100"
                    }`}
                  >
                    <Icon
                      size={24}
                      strokeWidth={1.8}
                      className={`${
                        active
                          ? "stroke-[#3283EC]"
                          : "stroke-[#949494] group-hover:stroke-[#3283EC]"
                      }`}
                    />
                    <span className="text-[15px] tracking-wide">
                      {item.name}
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }

          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #d1d5db;
            border-radius: 10px;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #9ca3af;
          }
        `}</style>
      </aside>
    </div>
  );
}
