
"use client";

import Link from "next/link";
import { UtensilsCrossed, ShoppingCart } from "lucide-react";
import { DarkModeToggle } from "./DarkModeToggle";
import { NavMenu } from "./NavMenu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { mockUser } from "../../lib/data"; // Placeholder for user data
import { useCart } from "../../context/CartContext";
import { Badge } from "../ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { CartSheetContent } from "../cart/CartSheetContent";
import React from 'react';


export function Header() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <UtensilsCrossed className="h-7 w-7 text-primary" />
          <span className="text-2xl font-bold tracking-tight text-foreground">
            MunchEase
          </span>
        </Link>
        
        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="hidden md:block">
            <NavMenu />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs rounded-full">
                    {totalItems}
                  </Badge>
                )}
                <span className="sr-only">Open Cart</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
              <SheetHeader className="mb-4">
                <SheetTitle>Your Order</SheetTitle>
              </SheetHeader>
              <CartSheetContent />
            </SheetContent>
          </Sheet>
          <DarkModeToggle />
          <Avatar className="h-9 w-9">
            <AvatarImage src={mockUser.avatarUrl} alt={mockUser.name} data-ai-hint="person avatar" />
            <AvatarFallback>{mockUser.name.substring(0,1).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="md:hidden border-t">
        <div className="container py-2 flex justify-center">
         <NavMenu />
        </div>
      </div>
    </header>
  );
}
