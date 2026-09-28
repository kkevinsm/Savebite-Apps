"use client";

import { useEffect, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const PUBLIC_ROUTES = ["/login"];
const FULLSCREEN_ROUTES = ["/scan", "/login"];

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const isFullscreen = FULLSCREEN_ROUTES.includes(pathname);

  useEffect(() => {
    if (!isLoggedIn && !PUBLIC_ROUTES.includes(pathname)) {
      router.replace("/login");
    }
  }, [isLoggedIn, pathname, router]);

  return (
    <div
      className={`flex-1 overflow-y-auto hide-scrollbar ${
        isFullscreen ? "h-full" : "pb-20"
      }`}
    >
      {children}
    </div>
  );
}
