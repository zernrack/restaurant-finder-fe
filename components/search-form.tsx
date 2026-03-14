"use client";

import { useState } from "react";
import { searchRestaurants } from "@/lib/api";
import { Restaurant } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Search, AlertCircle } from "lucide-react";

export default function SearchForm({
  onResults,
}: {
  onResults: (data: Restaurant[]) => void;
}) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!query.trim()) return;

    setError(null);
    setLoading(true);

    try {
      const data = await searchRestaurants(query);
      onResults(data.results);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full space-y-3">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder='Try: "Italian restaurants in New York"'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 text-base h-11"
          />
        </div>

        <Button
          type="submit"
          disabled={loading || !query.trim()}
          size="lg"
          className="h-11"
        >
          {loading ? (
            <>
              <span className="inline-block animate-spin mr-2">⏳</span>
              Searching...
            </>
          ) : (
            "Search"
          )}
        </Button>
      </form>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>We couldn’t complete your search</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
