import { z } from "zod";

export const RestaurantSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string().optional(),
  category: z.string().optional(),
  rating: z.number().optional(),
  priceLevel: z.number().optional(),
  openNow: z.boolean().optional(),
  hours: z.array(z.string()).optional(),
  website: z.string().optional(),
});

export const ExecuteResponseSchema = z
  .object({
    query: z.string(),
    results: z.array(RestaurantSchema),
  })
  .loose(); // allows interpreted_params

export type ExecuteResponse = z.infer<typeof ExecuteResponseSchema>;
export type Restaurant = z.infer<typeof RestaurantSchema>;
