"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BookOpen,
  CreditCard,
  Gauge,
  GraduationCap,
  Layers,
  LogOut,
  MessageSquareText,
  ScrollText,
  Settings,
  UserPlus,
  UserRound,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Gauge,
  },
  {
    title: "Students",
    url: "/dashboard/student",
    icon: Users,
  },
  {
    title: "Enquiry",
    url: "/dashboard/enquiry",
    icon: MessageSquareText,
  },
  {
    title: "Courses",
    url: "/dashboard/course",
    icon: BookOpen,
  },
  {
    title: "Batches",
    url: "/dashboard/batch",
    icon: Layers,
  },
  {
    title: "Teachers",
    url: "/dashboard/teacher",
    icon: UserRound,
  },
  {
    title: "Fees",
    url: "/dashboard/fees",
    icon: CreditCard,
  },
  // {
  //   title: "Certificates",
  //   url: "/dashboard/certificate",
  //   icon: ScrollText,
  // },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("tfp_user");
    router.push("/login");
  };

  return (
    <aside className="sticky top-0 flex h-screen w-72 flex-col border-r border-slate-200 bg-white px-4 py-5">
      <div className="mb-6 rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-950 p-5 text-white shadow-sm">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
          <GraduationCap size={24} />
        </div>

        <h1 className="mt-4 text-lg font-bold leading-tight">
          TFP Coding Classes
        </h1>

        <p className="mt-1 text-xs leading-5 text-indigo-100">
          Management Dashboard
        </p>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.url || pathname.startsWith(`${item.url}/`);

          return (
            <Link
              key={item.title}
              href={item.url}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
              }`}
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-xl transition ${
                  isActive
                    ? "bg-indigo-100 text-indigo-700"
                    : "bg-slate-100 text-slate-500 group-hover:text-slate-900"
                }`}
              >
                <Icon size={18} />
              </span>

              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-100 pt-4">
        {/* <Link
          href="/dashboard/settings"
          className="mb-2 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
            <Settings size={18} />
          </span>
          Settings
        </Link> */}

        <Button
          type="button"
          onClick={handleLogout}
          className="flex h-11 w-full items-center justify-start gap-3 rounded-xl bg-red-50 px-3 text-sm font-semibold text-red-600 hover:bg-red-100"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
            <LogOut size={17} />
          </span>
          Logout
        </Button>
      </div>
    </aside>
  );
}