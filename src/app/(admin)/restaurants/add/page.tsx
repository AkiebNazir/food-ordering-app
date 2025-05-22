
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card";
import { AddRestaurantForm } from "../../../../components/admin/AddRestaurantForm";
import Link from "next/link";
import { Button } from "../../../../components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function AddRestaurantPage() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
        <Button variant="outline" asChild className="mb-4">
            <Link href="/admin/restaurants">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Restaurants
            </Link>
        </Button>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Add New Restaurant</CardTitle>
          <CardDescription>
            Fill in the details below to add a new restaurant to the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddRestaurantForm />
        </CardContent>
      </Card>
    </div>
  );
}
