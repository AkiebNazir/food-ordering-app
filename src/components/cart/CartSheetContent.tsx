
"use client";

import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import { useCart } from "../../context/CartContext";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { MinusCircle, PlusCircle, Trash2, ShoppingBag } from "lucide-react";
import type { CartItem } from '../../lib/types';

export function CartSheetContent() {
  const { items, removeItem, updateQuantity, totalItems, cartTotalAmount, clearCart } = useCart();

  if (totalItems === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <ShoppingBag className="h-24 w-24 text-muted-foreground mb-4" />
        <p className="text-xl font-semibold text-foreground">Your cart is empty</p>
        <p className="text-muted-foreground mb-6">Looks like you haven't added anything yet.</p>
        <Button asChild>
          <Link href="/">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-grow pr-4 -mr-4 mb-4"> {/* Negative margin to offset scrollbar */}
        <div className="space-y-4">
          {items.map((item: CartItem) => (
            <div key={item.cartItemId} className="flex items-start space-x-4 p-3 rounded-lg border">
              <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                <Image
                  src={item.imageUrl || "https://placehold.co/100x100.png"}
                  alt={item.name}
                  fill
                  sizes="80px"
                  style={{ objectFit: "cover" }}
                  data-ai-hint="food item"
                />
              </div>
              <div className="flex-grow">
                <h4 className="font-semibold text-md">{item.name}</h4>
                {item.selectedVariant && (
                  <p className="text-xs text-muted-foreground">
                    {item.selectedVariant.variantName}: {item.selectedVariant.optionName}
                  </p>
                )}
                {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                  <ul className="text-xs text-muted-foreground list-disc list-inside pl-1">
                    {item.selectedAddOns.map(addon => <li key={addon.name}>{addon.name}</li>)}
                  </ul>
                )}
                 <p className="text-sm font-medium text-primary mt-1">
                  ${item.unitPrice.toFixed(2)} each
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <MinusCircle className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium w-5 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                  >
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="text-right flex flex-col items-end">
                <p className="text-md font-semibold">${item.totalPrice.toFixed(2)}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 mt-auto text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => removeItem(item.cartItemId)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <Separator className="my-4" />
      <div className="space-y-3">
        <div className="flex justify-between text-lg font-semibold">
          <span>Subtotal:</span>
          <span>${cartTotalAmount.toFixed(2)}</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Taxes and delivery fees will be calculated at checkout.
        </p>
        <Button size="lg" className="w-full" asChild>
          <Link href="/checkout">Proceed to Checkout</Link>
        </Button>
        <Button variant="outline" size="lg" className="w-full" onClick={clearCart}>
            Clear Cart
        </Button>
      </div>
    </div>
  );
}
