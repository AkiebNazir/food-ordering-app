
import { mockRestaurants } from "../../../../lib/data";
import type { MenuCategory } from "../../../../lib/types";
import { MenuItemCard } from "../../../../components/restaurants/MenuItemCard";
import { Separator } from "../../../../components/ui/separator";
import { Utensils } from "lucide-react";
import Link from "next/link";
import { Button } from "../../../../components/ui/button";
import { ChevronLeft } from "lucide-react";

type FoodMenuPageProps = {
  params: { id: string };
};

export default async function FoodMenuPage({ params }: FoodMenuPageProps) {
  const restaurant = mockRestaurants.find((r) => r.id === params.id);

  if (!restaurant || !restaurant.menu) {
    return <div className="text-center py-10">Menu not found for this restaurant.</div>;
  }

  const menu: MenuCategory[] = restaurant.menu;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="outline" asChild className="mb-4">
            <Link href={`/restaurants/${params.id}`}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Restaurant
            </Link>
          </Button>
          <h1 className="text-4xl font-bold text-primary flex items-center">
             <Utensils className="mr-3 h-10 w-10" /> Menu for {restaurant.name}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Explore our delicious offerings. Click "Add to Order" to select your items.
          </p>
        </div>
      </div>
      
      <Separator />

      {menu.map((category, index) => (
        <section key={index} className="space-y-6">
          <h2 className="text-3xl font-semibold text-foreground border-b-2 border-primary pb-2">
            {category.name}
          </h2>
          {category.items.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {category.items.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No items in this category at the moment.</p>
          )}
        </section>
      ))}
    </div>
  );
}
