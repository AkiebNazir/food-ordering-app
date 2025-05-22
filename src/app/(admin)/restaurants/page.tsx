
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import { mockRestaurants } from "../../../lib/data"; // Using mock data
import type { Restaurant } from "../../../lib/types";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import Image from "next/image";
import { Badge } from "../../../components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";

export default async function AdminRestaurantsPage() {
  // In a real app, fetch restaurants from your data source
  const restaurants: Restaurant[] = mockRestaurants;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Restaurants</h1>
        <Button asChild>
          <Link href="/admin/restaurants/add">
            <PlusCircle className="mr-2 h-5 w-5" /> Add New Restaurant
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Restaurant List</CardTitle>
          <CardDescription>
            View and manage all restaurants in the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  Image
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Cuisine</TableHead>
                <TableHead className="hidden md:table-cell">Rating</TableHead>
                <TableHead className="hidden md:table-cell">Delivery Time</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {restaurants.map((restaurant) => (
                <TableRow key={restaurant.id}>
                  <TableCell className="hidden sm:table-cell">
                    <div className="relative h-16 w-16 rounded-md overflow-hidden">
                      <Image
                        alt={restaurant.name}
                        className="aspect-square rounded-md object-cover"
                        src={restaurant.imageUrl || "https://placehold.co/64x64.png"}
                        fill
                        sizes="64px"
                        data-ai-hint={restaurant.dataAiHint || "restaurant food small"}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{restaurant.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{restaurant.cuisine}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{restaurant.rating} stars</TableCell>
                  <TableCell className="hidden md:table-cell">{restaurant.deliveryTime}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        {/* Placeholder actions - implement edit/delete pages and logic */}
                        <DropdownMenuItem onSelect={() => alert(`Edit ${restaurant.name} (not implemented)`)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => alert(`Delete ${restaurant.name} (not implemented)`)} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-{restaurants.length}</strong> of <strong>{restaurants.length}</strong> restaurants
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
