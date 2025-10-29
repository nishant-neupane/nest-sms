"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/reusable/SideBar";
import Header from "@/components/reusable/Header";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const noLayoutRoutes = ["/login", "/signup"];
  const isAuthPage = noLayoutRoutes.includes(pathname);

  if (isAuthPage) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <div className="ml-64 pr-4 pt-3  overflow-y-auto">
          <Header />
          {children}
        </div>
      </div>
    </div>
  );
}
