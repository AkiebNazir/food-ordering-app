
import type { OrderStatus, Order } from "../../lib/types";
import { CheckCircle, Circle, Dot, Package, CookingPot, Truck, ShoppingBag } from "lucide-react";
import { cn } from "../../lib/utils";

type OrderStatusTimelineProps = {
  order: Order;
};

const statusIcons: Record<OrderStatus, JSX.Element> = {
  "Confirmed": <ShoppingBag className="h-5 w-5" />,
  "Preparing": <CookingPot className="h-5 w-5" />,
  "Out for Delivery": <Truck className="h-5 w-5" />,
  "Delivered": <Package className="h-5 w-5" />,
  "Cancelled": <Circle className="h-5 w-5" />, // Example, could be XCircle
};

const getStatusDetails = (status: OrderStatus, currentStatus: OrderStatus, timestamp?: string) => {
  const isCompleted = 
    (status === "Confirmed" && (currentStatus === "Preparing" || currentStatus === "Out for Delivery" || currentStatus === "Delivered")) ||
    (status === "Preparing" && (currentStatus === "Out for Delivery" || currentStatus === "Delivered")) ||
    (status === "Out for Delivery" && currentStatus === "Delivered") ||
    status === currentStatus || status === "Delivered";
  
  const isActive = status === currentStatus;

  return {
    icon: isCompleted ? <CheckCircle className="h-5 w-5 text-green-500" /> : statusIcons[status],
    textColor: isActive ? "text-primary font-semibold" : isCompleted ? "text-green-500" : "text-muted-foreground",
    lineColor: isCompleted ? "bg-green-500" : "bg-border",
    timestampText: timestamp ? new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "",
    isActive,
    isCompleted
  };
};


export function OrderStatusTimeline({ order }: OrderStatusTimelineProps) {
  const allPossibleStatuses: OrderStatus[] = ["Confirmed", "Preparing", "Out for Delivery", "Delivered"];
  
  const statusMap = new Map(order.statusHistory?.map(s => [s.status, s.timestamp]));

  return (
    <div className="space-y-8">
      {allPossibleStatuses.map((status, index) => {
        const { icon, textColor, lineColor, timestampText, isActive, isCompleted } = getStatusDetails(status, order.status, statusMap.get(status));
        const isLast = index === allPossibleStatuses.length - 1;

        return (
          <div key={status} className="flex items-start">
            <div className="flex flex-col items-center mr-4">
              <div className={cn(
                "flex items-center justify-center h-10 w-10 rounded-full border-2",
                isActive ? "border-primary bg-primary/10" : isCompleted ? "border-green-500 bg-green-500/10" : "border-border"
              )}>
                {icon}
              </div>
              {!isLast && (
                <div className={cn("w-0.5 h-12 mt-1", isActive || isCompleted ? lineColor : "bg-border")} />
              )}
            </div>
            <div className="pt-1.5">
              <p className={cn("text-md", textColor)}>{status}</p>
              { (isActive || isCompleted) && timestampText && <p className="text-xs text-muted-foreground">{timestampText}</p> }
              { isActive && status === "Out for Delivery" && <p className="text-xs text-primary animate-pulse">Your order is on its way!</p> }
              { isActive && status === "Preparing" && <p className="text-xs text-primary animate-pulse">Your meal is being carefully prepared.</p> }
            </div>
          </div>
        );
      })}
    </div>
  );
}
