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
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="ml-[245px] pr-4 pt-6 h-[calc(100vh-64px)] overflow-y-auto">
          <Header />
          {children}
        </div>
      </div>
    </div>
  );
}
