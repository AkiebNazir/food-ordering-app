
import Image from "next/image";
import Link from "next/link";
import type { Restaurant } from "../../lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Star, Clock, MapPin, ChefHat } from "lucide-react";
import { Button } from "../ui/button";

type RestaurantCardProps = {
  restaurant: Restaurant;
};

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-102 flex flex-col h-full group">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            data-ai-hint={restaurant.dataAiHint || "restaurant food"}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-xl mb-2">
          <Link href={`/restaurants/${restaurant.id}`} className="hover:text-primary transition-colors">
            {restaurant.name}
          </Link>
        </CardTitle>
        <div className="flex items-center text-sm text-muted-foreground mb-1">
          <ChefHat className="h-4 w-4 mr-1 text-primary" />
          <span>{restaurant.cuisine}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground mb-1">
          <Star className="h-4 w-4 mr-1 text-yellow-500 fill-yellow-500" />
          <span>{restaurant.rating} stars</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground mb-1">
          <Clock className="h-4 w-4 mr-1 text-primary" />
          <span>{restaurant.deliveryTime}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1 text-primary" />
          <span>{restaurant.distance}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/restaurants/${restaurant.id}/menu`}>View Menu</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
