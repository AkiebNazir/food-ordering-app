
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ListPlus, Utensils, Settings, ShoppingBag } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";

const adminNavItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: Home },
  { href: "/admin/restaurants", label: "Restaurants", icon: Utensils },
  { href: "/admin/restaurants/add", label: "Add Restaurant", icon: ListPlus },
  // Add more admin links here, e.g., for orders, users, settings
  // { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  // { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden border-r bg-sidebar md:block w-64"> {/* Changed bg-card to bg-sidebar */}
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-16 items-center border-b border-sidebar-border px-6"> {/* Added sidebar-border */}
          <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold text-sidebar-primary"> {/* Use sidebar-primary */}
            <ShoppingBag className="h-6 w-6" />
            <span>MunchEase Admin</span>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            {adminNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:text-sidebar-accent-foreground hover:bg-sidebar-accent",
                  pathname === item.href && "bg-sidebar-accent text-sidebar-accent-foreground" // Use sidebar theme colors
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        {/* Optional Footer in Sidebar */}
        {/* <div className="mt-auto p-4 border-t border-sidebar-border"> 
          <Button size="sm" className="w-full">
            Log Out
          </Button>
        </div> */}
      </div>
    </aside>
  );
}
