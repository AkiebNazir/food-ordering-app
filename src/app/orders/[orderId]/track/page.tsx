
import { mockOrders } from "../../../../lib/data";
import { OrderTrackerMapPlaceholder } from "../../../../components/orders/OrderTrackerMapPlaceholder";
import { OrderStatusTimeline } from "../../../../components/orders/OrderStatusTimeline";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Separator } from "../../../../components/ui/separator";
import { AlertCircle, Clock, ListOrdered, MapPinIcon, Navigation, Package, ShoppingBag } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../../../../components/ui/alert";
import Link from "next/link";
import { Button } from "../../../../components/ui/button";

type OrderTrackingPageProps = {
  params: { orderId: string };
};

export default async function OrderTrackingPage({ params }: OrderTrackingPageProps) {
  const order = mockOrders.find((o) => o.id === params.orderId);

  if (!order) {
    return (
      <Alert variant="destructive" className="max-w-lg mx-auto my-10">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Order Not Found</AlertTitle>
        <AlertDescription>
          The order ID "{params.orderId}" could not be found. Please check the ID and try again.
          <Button variant="link" asChild className="p-0 h-auto ml-1"><Link href="/">Go to Homepage</Link></Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-8">
      <Card className="shadow-xl">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-3xl font-bold text-primary flex items-center">
                <ShoppingBag className="mr-3 h-8 w-8" /> Order Tracking
              </CardTitle>
              <CardDescription className="mt-1">
                Tracking ID: <span className="font-semibold text-foreground">{order.id}</span> from <span className="font-semibold text-foreground">{order.restaurantName}</span>
              </CardDescription>
            </div>
            <div className="mt-4 md:mt-0 text-left md:text-right">
                <p className="text-lg font-semibold text-foreground">Status: <span className="text-primary">{order.status}</span></p>
                <p className="text-sm text-muted-foreground flex items-center justify-start md:justify-end">
                    <Clock className="h-4 w-4 mr-1"/> {order.estimatedDeliveryTime}
                </p>
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-6">
             <h3 className="text-xl font-semibold text-foreground mb-2">Order Progress</h3>
            <OrderStatusTimeline order={order} />
          </div>
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center">
                <Navigation className="mr-2 h-5 w-5"/> Delivery Route
            </h3>
            <OrderTrackerMapPlaceholder />
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center"><MapPinIcon className="mr-2 h-5 w-5"/>Delivery Address</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{order.deliveryAddress}</p>
                </CardContent>
            </Card>
          </div>
        </CardContent>
        <Separator />
        <CardFooter className="p-6">
            <div className="w-full">
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center"><ListOrdered className="mr-2 h-5 w-5"/>Order Summary</h3>
                <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside mb-3">
                    {order.items.map((item, index) => (
                        <li key={index}>{item.name} (x{item.quantity})</li>
                    ))}
                </ul>
                <p className="text-lg font-bold text-right text-foreground">Total: ${order.totalAmount.toFixed(2)}</p>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}
