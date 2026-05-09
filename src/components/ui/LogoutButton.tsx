"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("tfp_user");
    router.push("/login");
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 absolute bottom-20 pr-34 rounded-lg px-4 py-2 text-sm bg-red-50 text-red-600 hover:bg-red-100"
    >
      <LogOut size={16} />
      Logout
    </button>
  );
}