import { createClient } from "@supabase/supabase-js";

import supabase from "@/utils/fetchdb";

export async function getResume() {
  const { data, error } = await supabase
    .from("resume")
    .select(
      `
      *,
      job(*),
      education(*)
    `
    )
    .single();

  if (error) {
    console.error("Error fetching resume:", error);
    return null;
  }

  return data;
}
