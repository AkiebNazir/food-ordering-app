
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";

const navItems = [
  { href: "/", label: "Restaurants" },
  { href: "/orders/order123/track", label: "Track Order" }, // Example track order link
];

export function NavMenu() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-2 md:space-x-4">
      {navItems.map((item) => (
        <Button
          key={item.href}
          variant="ghost"
          asChild
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === item.href
              ? "text-primary"
              : "text-muted-foreground"
          )}
        >
          <Link href={item.href}>{item.label}</Link>
        </Button>
      ))}
    </nav>
  );
}
