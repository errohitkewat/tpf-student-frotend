"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import {
  ClipboardList,
  Coffee,
  CreditCard,
  FolderTree,
  LayoutGridIcon,
  NotebookText,
  ReceiptIndianRupee,
  Settings,
  Users,
  UtensilsCrossed,
} from "lucide-react";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./ui/LogoutButton";

const menu = [
  { id: 1, title: "Dashboard", to: "/dashboard", icon: LayoutGridIcon },
  { id: 2, title: "Billing", to: "/dashboard/fees", icon: CreditCard },
  { id: 3, title: "Student", to: "/dashboard/student", icon: NotebookText },
  { id: 4, title: "Course", to: "/dashboard/course", icon: NotebookText },
  { id: 5, title: "Certificate", to: "/dashboard/certificate", icon: NotebookText },
  { id: 6, title: "Batch", to: "/dashboard/batch", icon: NotebookText },
  { id: 7, title: "Teacher", to: "/dashboard/teacher", icon: NotebookText },
  { id: 8, title: "Enquiry", to: "/dashboard/enquiry", icon: NotebookText },
];

export default function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar
      collapsible="icon"
      variant="floating"
      className="fixed top-0 left-0 h-screen"
    >
      <style>{scrollbarStyles}</style>
      <SidebarContent className="flex flex-col overflow-hidden rounded-lg bg-background text-foreground">
        <SidebarGroup className="flex flex-col flex-1">
          <SidebarGroupLabel className="font-bold text-foreground text-2xl mt-4 mb-10 shrink-0">
            TFP Coding.
          </SidebarGroupLabel>

          <SidebarGroupContent className="flex-1">
            <SidebarMenu className="scrollbar-custom font-medium flex flex-col gap-y-2 h-[70vh] overflow-y-scroll scrollbar-hidden overflow-x-hidden">
              {menu.map((item) => {
                const isActive =
                  pathname === item.to ||
                  (item.to !== "/" &&
                    item.to !== "/dashboard" &&
                    pathname.startsWith(item.to)) ||
                  (item.to === "/" && pathname === "/");

                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      asChild
                      className={cn(
                        "text-base py-[1.1rem] px-4 hover:bg-muted hover:text-foreground",
                        isActive &&
                          "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground",
                      )}
                    >
                      <Link href={item.to}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
              <LogoutButton />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

const scrollbarStyles = `
  .scrollbar-custom {
    scrollbar-width: thin;
    scrollbar-color: rgba(99, 102, 241, 0.5) transparent;
  }
  
  .scrollbar-custom::-webkit-scrollbar {
    width: 1px;
  }
    .scrollbar-hidden::-webkit-scrollbar {
  display: none;
}


.scrollbar-hidden {
  scrollbar-width: none;
}


.scrollbar-hidden {
  -ms-overflow-style: none;
  overflow: auto; /* or overflow-y: scroll; */
  
  .scrollbar-custom::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 10px;
  }

  
  .scrollbar-custom::-webkit-scrollbar-thumb {
    background: linear-gradient(45deg, #6366f1, #8b5cf6);
    border-radius: 10px;
    border: 2px solid transparent;
    background-clip: content-box;
    transition: all 0.3s ease;
  }
  
  .scrollbar-custom::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(45deg, #4f46e5, #7c3aed);
    border-radius: 10px;
    border: 1px solid transparent;
    background-clip: content-box;
    box-shadow: 0 0 10px rgba(99, 102, 241, 0.3);
  }
  
  .scrollbar-custom::-webkit-scrollbar-thumb:active {
    background: linear-gradient(45deg, #4338ca, #6d28d9);
  }
  
  .scrollbar-custom-dark {
    scrollbar-width: thin;
    scrollbar-color: rgba(148, 163, 184, 0.5) transparent;
  }
  
  .scrollbar-custom-dark::-webkit-scrollbar {
    width: 8px;
  }
  
  .scrollbar-custom-dark::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 10px;
  }
  
  .scrollbar-custom-dark::-webkit-scrollbar-thumb {
    background: linear-gradient(45deg, #475569, #64748b);
    border-radius: 10px;
    border: 2px solid transparent;
    background-clip: content-box;
    transition: all 0.3s ease;
  }
  
  .scrollbar-custom-dark::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(45deg, #334155, #475569);
    border-radius: 10px;
    border: 1px solid transparent;
    background-clip: content-box;
    box-shadow: 0 0 10px rgba(148, 163, 184, 0.3);
  }
  
  .scrollbar-custom-dark::-webkit-scrollbar-thumb:active {
    background: linear-gradient(45deg, #1e293b, #334155);
  }
  
  .scrollbar-main {
    scrollbar-width: thin;
    scrollbar-color: rgba(99, 102, 241, 0.3) transparent;
  }
  
  .scrollbar-main::-webkit-scrollbar {
    width: 12px;
  }
  
  .scrollbar-main::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 10px;
  }
  
  .scrollbar-main::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899);
    border-radius: 10px;
    border: 3px solid transparent;
    background-clip: content-box;
    transition: all 0.3s ease;
  }
  
  .scrollbar-main::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #4f46e5, #7c3aed, #db2777);
    border-radius: 10px;
    border: 2px solid transparent;
    background-clip: content-box;
    box-shadow: 0 0 15px rgba(99, 102, 241, 0.4);
  }
  
  .scrollbar-main::-webkit-scrollbar-thumb:active {
    background: linear-gradient(135deg, #4338ca, #6d28d9, #be185d);
  }
`;
