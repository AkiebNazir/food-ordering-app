
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea"; // Assuming you might want a description field
import { useToast } from "../../hooks/use-toast";
import { useRouter } from "next/navigation";

// Define a schema for your restaurant form
const restaurantFormSchema = z.object({
  name: z.string().min(2, {
    message: "Restaurant name must be at least 2 characters.",
  }),
  cuisine: z.string().min(2, {
    message: "Cuisine type must be at least 2 characters.",
  }),
  rating: z.coerce.number().min(0).max(5, { // coerce turns string input to number
    message: "Rating must be between 0 and 5.",
  }),
  deliveryTime: z.string().min(3, {
    message: "Delivery time estimate is required (e.g., 30-45 min).",
  }),
  distance: z.string().min(2, {
    message: "Distance is required (e.g., 2.5 km).",
  }),
  imageUrl: z.string().url({ message: "Please enter a valid image URL." }).optional().or(z.literal('')),
  dataAiHint: z.string().optional(),
  // Add other fields like description, address, etc. as needed
});

type RestaurantFormValues = z.infer<typeof restaurantFormSchema>;

// Default values for the form
const defaultValues: Partial<RestaurantFormValues> = {
  name: "",
  cuisine: "",
  rating: 0,
  deliveryTime: "",
  distance: "",
  imageUrl: "",
  dataAiHint: "",
};

export function AddRestaurantForm() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<RestaurantFormValues>({
    resolver: zodResolver(restaurantFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: RestaurantFormValues) {
    // In a real app, you would send this data to your API
    console.log("New restaurant data:", data);
    toast({
      title: "Restaurant Added (Mock)",
      description: `${data.name} has been successfully added (simulated).`,
    });
    // Optionally, redirect after successful submission
    router.push("/admin/restaurants"); 
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Restaurant Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Pizza Palace" {...field} />
              </FormControl>
              <FormDescription>
                The official name of the restaurant.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cuisine"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cuisine Type</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Italian" {...field} />
              </FormControl>
              <FormDescription>
                Primary type of cuisine (e.g., Italian, Mexican, Indian).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Rating (0-5)</FormLabel>
                <FormControl>
                    <Input type="number" step="0.1" placeholder="e.g., 4.5" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="deliveryTime"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Delivery Time</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., 30-45 min" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <FormField
          control={form.control}
          name="distance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Distance</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 2.5 km" {...field} />
              </FormControl>
              <FormDescription>
                Distance from a central point or average distance.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://placehold.co/600x400.png" {...field} />
              </FormControl>
              <FormDescription>
                A direct link to an image for the restaurant listing.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="dataAiHint"
          render={({ field }) => (
            <FormItem>
              <FormLabel>AI Image Hint (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., pizza restaurant" {...field} />
              </FormControl>
              <FormDescription>
                One or two keywords for AI image generation if needed.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Add Textarea for description or other fields as needed */}
        {/* <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about this restaurant"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Button type="submit" className="w-full md:w-auto">Add Restaurant</Button>
      </form>
    </Form>
  );
}
