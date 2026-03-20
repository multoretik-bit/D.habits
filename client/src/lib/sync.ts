import { supabase } from "./supabase";

const TABLE = "user_data";

export async function syncSave(userId: string, data: object) {
  try {
    await supabase.from(TABLE).upsert(
      { user_id: userId, data, updated_at: new Date().toISOString() },
      { onConflict: "user_id" }
    );
  } catch (e) {
    console.error("syncSave error", e);
  }
}

export async function syncLoad(userId: string): Promise<object | null> {
  try {
    const { data, error } = await supabase
      .from(TABLE)
      .select("data")
      .eq("user_id", userId)
      .single();
    if (error || !data) return null;
    return data.data;
  } catch (e) {
    console.error("syncLoad error", e);
    return null;
  }
}
