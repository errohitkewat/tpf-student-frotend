"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("tfp_user");

    if (!user) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider defaultOpen>
        <div className="flex w-full min-h-screen">
          <AppSidebar />

          <div className="flex-1 overflow-auto">
            <div className="p-4 md:hidden">
              <SidebarTrigger className="cursor-pointer" />
            </div>

            <div className="px-4 md:px-6 pt-6">{children}</div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}