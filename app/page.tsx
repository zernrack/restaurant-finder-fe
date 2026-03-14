"use client";

import { useState } from "react";
import SearchForm from "@/components/search-form";
import RestaurantCard from "@/components/restaurant-card";
import { Restaurant } from "@/lib/schema";
import { Utensils, MapPin, Heart } from "lucide-react";

export default function Page() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleResults = (results: Restaurant[]) => {
    setRestaurants(results);
    setHasSearched(true);
  };

  return (
    <main className="min-h-screen flex flex-col bg-linear-to-br from-background via-background to-accent/5">
      {/* Header Section */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Utensils className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              Restaurant Finder
            </h1>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base ml-11">
            Discover amazing restaurants in your area
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 w-full">
        {/* Search Section */}
        <div className="mb-12">
          <SearchForm onResults={handleResults} />
        </div>

        {/* Results Section */}
        <div>
          {!hasSearched ? (
            <div className="text-center py-12">
              <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Start Your Search
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Enter a location or cuisine type to discover restaurants near
                you. Try searching for &quot;Italian restaurants in New York&quot; or
                &quot;sushi near LA open now&quot;.
              </p>
            </div>
          ) : restaurants.length > 0 ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Found {restaurants.length} restaurants
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Showing all available results
                  </p>
                </div>
              </div>
              <div className="grid gap-4 sm:gap-6">
                {restaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex p-3 rounded-full bg-accent/10 mb-4">
                <MapPin className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                No restaurants found
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Try adjusting your search criteria or try a different location.
              </p>
            </div>
          )}
        </div>
      </div>

      <footer className="border-t border-border/60 py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1.5">
            Made with
            <Heart className="w-4 h-4 text-primary fill-primary" aria-hidden="true" />
            by
            <a
              href="https://rrack.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary transition-colors"
            >
              rrack.dev
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}
