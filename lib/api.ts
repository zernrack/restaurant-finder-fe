import { ExecuteResponseSchema } from "./schema";

function getFriendlyErrorMessage(
  status?: number,
  backendError?: string,
): string {
  const normalized = backendError?.toLowerCase() ?? "";

  if (normalized.includes("please provide a restaurant search query")) {
    return "Please type what kind of food or place you want to find.";
  }

  if (normalized.includes("query is too long")) {
    return "Your search is too long. Please make it shorter and try again.";
  }

  if (normalized.includes("unsupported prompt-like instructions")) {
    return "Please enter a normal restaurant search, like 'pizza in Cebu open now'.";
  }

  if (normalized.includes("could not extract a valid restaurant query")) {
    return "We couldn’t understand that search. Please try a simpler request.";
  }

  if (status === 400) {
    return "We couldn’t process your search. Please check your request and try again.";
  }

  if (status === 401) {
    return "Access was denied. Please refresh and try again.";
  }

  if (status === 404) {
    return "Service is temporarily unavailable. Please try again in a moment.";
  }

  if (status !== undefined && status >= 500) {
    return "Something went wrong on our side. Please try again shortly.";
  }

  return "We couldn’t fetch restaurants right now. Please check your connection and try again.";
}

export async function searchRestaurants(message: string) {
  if (!message.trim()) {
    throw new Error("Please type what kind of food or place you want to find.");
  }

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
  const params = new URLSearchParams({
    message,
    code: "pioneerdevai",
  });

  let res: Response;

  try {
    res = await fetch(`${apiBaseUrl}/api/execute?${params.toString()}`);
  } catch {
    throw new Error(
      "We couldn’t reach the server. Please check your connection and try again.",
    );
  }

  if (!res.ok) {
    const body = await res.text();

    let backendError: string | undefined;

    if (body) {
      try {
        const parsed = JSON.parse(body) as { error?: string };
        backendError = parsed?.error;
      } catch {
        backendError = undefined;
      }
    }

    throw new Error(getFriendlyErrorMessage(res.status, backendError));
  }

  const json: unknown = await res.json();

  const parsed = ExecuteResponseSchema.safeParse(json);

  if (!parsed.success) {
    throw new Error("We got an unexpected response. Please try again.");
  }

  return parsed.data;
}
