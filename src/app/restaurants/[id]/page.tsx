
import Image from "next/image";
import Link from "next/link";
import { mockRestaurants, mockReviews } from "../../../lib/data"; // Using general mockReviews for now
import { ReviewCard } from "../../../components/restaurants/ReviewCard";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";
import { Star, Clock, MapPin, ChefHat, Image as ImageIcon, BookOpenText, MessageSquare } from "lucide-react";
import { AspectRatio } from "../../../components/ui/aspect-ratio";
import { ScrollArea, ScrollBar } from "../../../components/ui/scroll-area";

type RestaurantDetailsPageProps = {
  params: { id: string };
};

export default async function RestaurantDetailsPage({ params }: RestaurantDetailsPageProps) {
  const restaurant = mockRestaurants.find((r) => r.id === params.id);

  if (!restaurant) {
    // In a real app, you'd fetch data here or use a notFound() helper from Next.js
    return <div className="text-center py-10">Restaurant not found.</div>;
  }

  const reviews = restaurant.reviews || mockReviews; // Fallback to general mock reviews

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden shadow-xl">
        <CardHeader className="p-0 relative">
          <AspectRatio ratio={16 / 9}>
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              className="object-cover"
              priority
              data-ai-hint={restaurant.dataAiHint || "restaurant exterior"}
            />
          </AspectRatio>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <h1 className="text-4xl font-bold text-white shadow-md">{restaurant.name}</h1>
            <div className="flex items-center mt-2 space-x-4 text-sm text-gray-200">
              <span className="flex items-center"><ChefHat className="h-5 w-5 mr-1" /> {restaurant.cuisine}</span>
              <span className="flex items-center"><Star className="h-5 w-5 mr-1 text-yellow-400 fill-yellow-400" /> {restaurant.rating} stars</span>
              <span className="flex items-center"><Clock className="h-5 w-5 mr-1" /> {restaurant.deliveryTime}</span>
              <span className="flex items-center"><MapPin className="h-5 w-5 mr-1" /> {restaurant.distance}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-end">
            <Button asChild size="lg">
              <Link href={`/restaurants/${restaurant.id}/menu`}>
                <BookOpenText className="mr-2 h-5 w-5" /> View Full Menu
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {restaurant.photos && restaurant.photos.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center"><ImageIcon className="mr-2 h-6 w-6 text-primary"/> Photo Gallery</h2>
          <ScrollArea className="w-full whitespace-nowrap rounded-md border">
            <div className="flex space-x-4 p-4">
              {restaurant.photos.map((photoUrl, index) => (
                <figure key={index} className="shrink-0">
                  <div className="overflow-hidden rounded-md w-80 h-60 relative">
                    <Image
                      src={photoUrl}
                      alt={`${restaurant.name} photo ${index + 1}`}
                      fill
                      className="object-cover"
                      data-ai-hint="restaurant interior food"
                    />
                  </div>
                </figure>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>
      )}
      
      <Separator />

      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center"><MessageSquare className="mr-2 h-6 w-6 text-primary"/> Customer Reviews</h2>
        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No reviews yet for this restaurant.</p>
        )}
      </section>
    </div>
  );
}
