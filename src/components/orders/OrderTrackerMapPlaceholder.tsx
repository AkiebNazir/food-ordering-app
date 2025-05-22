
import { Card, CardContent } from "../ui/card";
import { MapPin } from "lucide-react";
import Image from "next/image";

export function OrderTrackerMapPlaceholder() {
  return (
    <Card className="shadow-lg">
      <CardContent className="p-0">
        <div className="aspect-video bg-muted flex items-center justify-center relative overflow-hidden rounded-md">
           <Image 
            src="https://placehold.co/800x450.png" 
            alt="Map placeholder" 
            layout="fill" 
            objectFit="cover"
            data-ai-hint="map city"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30">
            <MapPin className="h-16 w-16 text-white/80 mb-4" />
            <p className="text-lg font-semibold text-white">Live Map Tracking (Placeholder)</p>
            <p className="text-sm text-white/70">Real map integration coming soon!</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
