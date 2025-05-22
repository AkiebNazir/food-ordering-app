
"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { SlidersHorizontal } from "lucide-react";

const cuisineOptions = ["All", "Italian", "American", "Japanese", "Indian", "Mexican", "Chinese"];
const ratingOptions = ["Any", "4.5+ Stars", "4.0+ Stars", "3.5+ Stars"];
const distanceOptions = ["Any", "Under 1km", "Under 3km", "Under 5km"];

export function RestaurantFilters() {
  const [cuisine, setCuisine] = useState("All");
  const [rating, setRating] = useState("Any");
  const [distance, setDistance] = useState("Any");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    // Implement search/filter logic here
    console.log({ searchTerm, cuisine, rating, distance });
  };

  return (
    <Card className="mb-8 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <SlidersHorizontal className="mr-2 h-6 w-6 text-primary" />
          Filter Restaurants
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5 items-end">
          <div className="lg:col-span-2">
            <Label htmlFor="search">Search by Name</Label>
            <Input
              id="search"
              type="text"
              placeholder="Restaurant name or dish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="cuisine">Cuisine</Label>
            <Select value={cuisine} onValueChange={setCuisine}>
              <SelectTrigger id="cuisine" className="mt-1">
                <SelectValue placeholder="Select cuisine" />
              </SelectTrigger>
              <SelectContent>
                {cuisineOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="rating">Rating</Label>
            <Select value={rating} onValueChange={setRating}>
              <SelectTrigger id="rating" className="mt-1">
                <SelectValue placeholder="Select rating" />
              </SelectTrigger>
              <SelectContent>
                {ratingOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* <div>
            <Label htmlFor="distance">Distance</Label>
            <Select value={distance} onValueChange={setDistance}>
              <SelectTrigger id="distance" className="mt-1">
                <SelectValue placeholder="Select distance" />
              </SelectTrigger>
              <SelectContent>
                {distanceOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div> */}
          <Button onClick={handleSearch} className="w-full h-10 mt-auto">
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
