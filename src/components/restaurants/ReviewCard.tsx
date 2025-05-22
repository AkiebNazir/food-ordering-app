
import type { Review } from "../../lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Star } from "lucide-react";

type ReviewCardProps = {
  review: Review;
};

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={`https://placehold.co/100x100.png?text=${review.userName.charAt(0)}`} alt={review.userName} data-ai-hint="person avatar" />
            <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-base font-semibold">{review.userName}</CardTitle>
            <p className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`}
            />
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground">{review.comment}</p>
      </CardContent>
    </Card>
  );
}
