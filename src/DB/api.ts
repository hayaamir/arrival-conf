import { Guest } from "../types";
import supabase from "./supabase";

export async function getGuests() {
  const { data: guests, error } = await supabase.from("guests").select("*");
  return { guests, error };
}

export async function createGuest(guest: Guest) {
  const dbGuest = {
    ...guest,
    gluten_free: +guest.gluten_free,
    vegan: +guest.vegan,
    coming: guest.coming === "coming" ? true : false,
  };
  delete dbGuest.not_coming;

  console.log(dbGuest);

  await supabase.from("guests").insert([dbGuest]);
}

// use to get notification when new guest register
// const guests = supabase
//   .channel("custom-update-channel")
//   .on(
//     "postgres_changes",
//     { event: "UPDATE", schema: "public", table: "guests" },
//     (payload) => {
//       console.log("Change received!", payload);
//     }
//   )
//   .subscribe();
