"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthWrapper({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [pathname]);

  const checkAuth = async () => {
    try {
      const res = await fetch("api/auth/me", {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        setIsAuthenticated(true);

        if (pathname === "/login" || pathname === "/signup") {
          router.push("/dashboard");
        }
      } else {
        setIsAuthenticated(false);

        const publicRoutes = ["/login", "/signup", "/forgot-password"];
        if (!publicRoutes.includes(pathname)) {
          router.push("/login");
        }
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setIsAuthenticated(false);

      const publicRoutes = ["/login", "/signup", "/forgot-password"];
      if (!publicRoutes.includes(pathname)) {
        router.push("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2375E0]"></div>
      </div>
    );
  }

  return children;
}
