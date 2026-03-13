import { ExecuteResponseSchema } from "./schema";

export async function searchRestaurants(message: string) {
  if (!message.trim()) {
    throw new Error("Please enter a search query.");
  }

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
  const params = new URLSearchParams({
    message,
    code: "pioneerdevai",
  });

  const res = await fetch(`${apiBaseUrl}/api/execute?${params.toString()}`);

  if (!res.ok) {
    const body = await res.text();
    throw new Error(
      `Failed to fetch restaurants (status ${res.status})${body ? `: ${body}` : ""}`,
    );
  }

  const json: unknown = await res.json();

  const parsed = ExecuteResponseSchema.safeParse(json);

  if (!parsed.success) {
    throw new Error("Invalid API response format.");
  }

  return parsed.data;
}
