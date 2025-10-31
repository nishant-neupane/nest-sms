"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/reusable/SideBar";
import Header from "@/components/reusable/Header";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const noLayoutRoutes = ["/login", "/signup", "/forgot-password", "/"];
  const isAuthPage = noLayoutRoutes.includes(pathname);

  if (isAuthPage) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <div className="flex h-screen">
      <div className="fixed left-0 top-0 h-screen z-40">
        <Sidebar />
      </div>

      <div className="flex flex-col w-full ml-[280px]">
        <div className="fixed top-0 right-0 left-[280px] z-30 bg-white">
          <div className="pr-4 pt-3">
            <Header />
          </div>
        </div>

        <div className="flex-1 pt-24 pr-4 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
