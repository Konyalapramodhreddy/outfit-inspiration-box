import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const BookingSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  plan: z.string().trim().min(1).max(50),
});

export const createBooking = createServerFn({ method: "POST" })
  .inputValidator((input) => BookingSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("bookings").insert(data);
    if (error) {
      console.error("Booking insert failed:", error);
      throw new Error("Could not save booking. Please try again.");
    }
    return { ok: true };
  });
