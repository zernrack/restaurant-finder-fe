"use client";

import { useState } from "react";
import { searchRestaurants } from "@/lib/api";
import { Restaurant } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
        err instanceof Error ? err.message : "Failed to fetch restaurants",
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
            placeholder="Find restaurants near you..."
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
        <div className="flex gap-2 p-3 rounded-lg bg-destructive/10 text-destructive border border-destructive/20">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <p className="text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}
