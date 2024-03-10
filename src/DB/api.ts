import supabase from "./supabase";
import { Guest } from "../types";

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

  const { error } = await supabase.from("guests").insert([dbGuest]);

  return error;
}
