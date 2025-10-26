"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function AuthWrapper({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const token = Cookies.get("access_token");
  //   if (!token && pathname !== "/login" && pathname !== "/signup") {
  //     router.push("/login");
  //     return;
  //   }

  //   if (token && (pathname === "/login" || pathname === "/signup")) {
  //     router.push("/dashboard");
  //     return;
  //   }

  //   setLoading(false);
  // }, [pathname, router]);

  // if (loading) return <div>Loading...</div>;

  return children;
}
