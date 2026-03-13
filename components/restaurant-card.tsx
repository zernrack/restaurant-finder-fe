import { Restaurant } from "@/lib/schema";
import { Clock, MapPin, Star, Link2, DollarSign } from "lucide-react";

export default function RestaurantCard({
  restaurant,
}: {
  restaurant: Restaurant;
}) {
  const isOpen = restaurant.openNow;

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300 p-5">
      {/* Status Badge */}
      {restaurant.openNow !== undefined && (
        <div className="absolute top-3 right-3">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
              isOpen
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : "bg-gray-100 text-gray-600 dark:bg-gray-900/30 dark:text-gray-400"
            }`}
          >
            {isOpen ? "Open Now" : "Closed"}
          </span>
        </div>
      )}

      {/* Header */}
      <div className="mb-4 pr-24">
        <h3 className="text-xl font-bold text-foreground mb-1 line-clamp-2">
          {restaurant.name}
        </h3>
        {restaurant.category && (
          <p className="text-sm text-muted-foreground">{restaurant.category}</p>
        )}
      </div>

      {/* Rating */}
      {restaurant.rating !== undefined && (
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 font-semibold text-foreground">
              {restaurant.rating.toFixed(1)}
            </span>
          </div>
          {restaurant.priceLevel !== undefined && (
            <div className="flex items-center gap-1 ml-auto text-muted-foreground">
              {Array.from({ length: restaurant.priceLevel }).map((_, i) => (
                <DollarSign key={i} className="w-4 h-4" />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Info Grid */}
      <div className="space-y-3">
        {restaurant.address && (
          <div className="flex gap-3">
            <MapPin className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
            <p className="text-sm text-foreground line-clamp-2">
              {restaurant.address}
            </p>
          </div>
        )}

        {restaurant.hours && restaurant.hours.length > 0 && (
          <div className="flex gap-3">
            <Clock className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
            <div className="text-sm text-foreground space-y-1">
              {restaurant.hours.slice(0, 2).map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
              {restaurant.hours.length > 2 && (
                <div className="text-xs text-muted-foreground">
                  +{restaurant.hours.length - 2} more
                </div>
              )}
            </div>
          </div>
        )}

        {restaurant.website && (
          <a
            href={restaurant.website}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors mt-3 pt-3 border-t border-border"
          >
            <Link2 className="w-4 h-4" />
            Visit Website
          </a>
        )}
      </div>
    </div>
  );
}
