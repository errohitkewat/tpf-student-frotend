"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-background">
      <h2 className="text-lg font-semibold">Welcome Back 👋</h2>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell size={18} />
        </Button>

        <Avatar>
          <AvatarFallback>RD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}