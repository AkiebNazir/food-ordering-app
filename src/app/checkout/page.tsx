
"use client";

import Link from "next/link";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { useCart } from "../../context/CartContext";
import { AlertCircle, CreditCard, Home, Package, ShoppingCart, Truck } from "lucide-react";
import Image from "next/image";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { useToast } from "../../hooks/use-toast";
import { useRouter } from "next/navigation"; // For redirecting

export default function CheckoutPage() {
  const { items, cartTotalAmount, clearCart, totalItems } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmitOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // In a real app, this would submit to a backend and payment processor
    console.log("Order submitted (mock)", { items, cartTotalAmount });

    toast({
      title: "Order Placed! (Mock)",
      description: "Your order has been successfully placed. We'll notify you about its status.",
      variant: "default", // 'default' is more appropriate for success than 'destructive'
    });
    
    // Generate a mock order ID for tracking
    const mockOrderId = `mockOrder-${Date.now().toString().slice(-6)}`;
    
    clearCart();
    // Redirect to a mock tracking page or homepage
    // For now, let's redirect to the existing track page with a mock ID
    router.push(`/orders/${mockOrderId}/track`); 
  };

  if (totalItems === 0) {
     return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-20rem)] text-center">
        <ShoppingCart className="h-24 w-24 text-muted-foreground mb-6" />
        <h1 className="text-3xl font-bold text-foreground mb-4">Your Cart is Empty</h1>
        <p className="text-lg text-muted-foreground mb-8">
          You need to add items to your cart before you can checkout.
        </p>
        <Button asChild size="lg">
          <Link href="/">Browse Restaurants</Link>
        </Button>
      </div>
    );
  }


  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary flex items-center">
            <CreditCard className="mr-3 h-8 w-8" /> Checkout
          </CardTitle>
          <CardDescription>Review your order and provide delivery & payment details.</CardDescription>
        </CardHeader>
        <Separator />
        <form onSubmit={handleSubmitOrder}>
          <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Order Summary Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground flex items-center">
                <Package className="mr-2 h-5 w-5" /> Order Summary
              </h3>
              <div className="max-h-80 overflow-y-auto space-y-3 pr-2 border rounded-md p-3 bg-muted/30">
                {items.map(item => (
                  <div key={item.cartItemId} className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <div className="relative h-12 w-12 rounded-md overflow-hidden mr-3 flex-shrink-0">
                        <Image
                          src={item.imageUrl || "https://placehold.co/80x80.png"}
                          alt={item.name}
                          fill sizes="48px" style={{ objectFit: "cover" }}
                          data-ai-hint="food item small"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{item.name} (x{item.quantity})</p>
                        {item.selectedVariant && <p className="text-xs text-muted-foreground">{item.selectedVariant.optionName}</p>}
                      </div>
                    </div>
                    <p className="font-medium">${item.totalPrice.toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <Separator />
              <div className="space-y-1 text-md">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold">${cartTotalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery Fee:</span>
                  <span className="font-semibold">TBD</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Taxes:</span>
                  <span className="font-semibold">TBD</span>
                </div>
                <Separator className="my-2"/>
                <div className="flex justify-between text-lg font-bold text-primary">
                  <span>Total:</span>
                  <span>${cartTotalAmount.toFixed(2)} (approx.)</span>
                </div>
              </div>
            </div>

            {/* Delivery & Payment Section */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center">
                  <Home className="mr-2 h-5 w-5" /> Delivery Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" required className="mt-1"/>
                  </div>
                  <div>
                    <Label htmlFor="address">Street Address</Label>
                    <Input id="address" placeholder="123 Main St" required className="mt-1"/>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="Anytown" required className="mt-1"/>
                    </div>
                    <div>
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input id="zip" placeholder="12345" required className="mt-1"/>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="(555) 123-4567" required className="mt-1"/>
                  </div>
                  <div>
                    <Label htmlFor="instructions">Delivery Instructions (Optional)</Label>
                    <Textarea id="instructions" placeholder="e.g., leave at front door" className="mt-1"/>
                  </div>
                </div>
              </div>
              <Separator />
              <div>
                 <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" /> Payment (Mock)
                </h3>
                <div className="space-y-3 p-4 border rounded-lg bg-destructive/10 border-destructive/50">
                    <div className="flex items-start text-destructive">
                        <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                        <p className="text-sm font-medium">
                        This is a mock payment section. No real payment will be processed. 
                        Do not enter real credit card details.
                        </p>
                    </div>
                    <div>
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input id="card-number" placeholder="**** **** **** 1234" defaultValue="**** **** **** 1234" className="mt-1"/>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                        <Label htmlFor="expiry">Expiry (MM/YY)</Label>
                        <Input id="expiry" placeholder="MM/YY" defaultValue="12/25" className="mt-1"/>
                        </div>
                        <div>
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" defaultValue="123" className="mt-1"/>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </CardContent>
          <Separator />
          <CardFooter className="p-6">
            <Button type="submit" size="lg" className="w-full">
              <Truck className="mr-2 h-5 w-5"/> Place Order & Pay (Mock)
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
