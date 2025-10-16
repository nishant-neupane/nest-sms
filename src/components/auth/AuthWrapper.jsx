"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthWrapper({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null;

    if (!token && pathname !== "/login" && pathname !== "/signup") {
      router.push("/login");
      return;
    }

    if (token && (pathname === "/login" || pathname === "/signup")) {
      router.push("/dashboard");
      return;
    }

    setLoading(false);
  }, [pathname]);

  if (loading) return <div>Loading...</div>;

  return children;
}
