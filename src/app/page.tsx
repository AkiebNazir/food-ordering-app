
import { RestaurantCard } from "../components/restaurants/RestaurantCard";
import { RestaurantFilters } from "../components/restaurants/RestaurantFilters";
import { mockRestaurants } from "../lib/data";
import { Separator } from "../components/ui/separator";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="text-center py-8 bg-gradient-to-r from-primary/10 via-background to-accent/10 rounded-lg shadow-sm">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">
          Find Your Next Meal
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover the best local restaurants and enjoy delicious food delivered right to your doorstep.
        </p>
      </section>

      <RestaurantFilters />
      
      <Separator />

      <div>
        <h2 className="text-3xl font-semibold mb-6 text-foreground">Popular Restaurants</h2>
        {mockRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-10">
            No restaurants available at the moment. Please check back later!
          </p>
        )}
      </div>
    </div>
  );
}
